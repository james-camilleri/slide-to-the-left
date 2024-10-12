import { PartySocket } from 'partysocket'

import { PUBLIC_PARTYKIT_HOST } from '$env/static/public'

enum SOCKET_STATE {
  DISCONNECTED,
  CONNECTING,
  CONNECTED,
}

enum REMOTE_TYPE {
  HOST,
  CLIENT,
}

interface Session {
  presentationId: string
  secret: string
  timestamp: number
}

interface Message {
  slide?: number
  status?: 'new-connection'
}

const NOOP = () => {}
const KEY = 'slide-presentation-id'
const MILLISECONDS_IN_24_HRS = 1000 * 60 * 60 * 24

class Remote {
  #type: REMOTE_TYPE | undefined
  #socketState = $state(SOCKET_STATE.DISCONNECTED)
  #presentationId: string | undefined
  #secret: string | undefined
  #send: (index: number) => void = NOOP
  #onSlideChange: (index: number) => void = NOOP
  #onStatusUpdate: (status: string) => void = NOOP

  #storeSession(presentationId: string, secret: string) {
    const data = { presentationId, secret, timestamp: Date.now() }
    localStorage.setItem(KEY, JSON.stringify(data))
  }

  #restoreSession() {
    const storedData = localStorage.getItem(KEY)
    const { presentationId, secret, timestamp } =
      storedData ? (JSON.parse(storedData) as Session) : {}
    if (timestamp && timestamp < Date.now() - MILLISECONDS_IN_24_HRS) {
      return { presentationId, secret }
    }
  }

  #setupSession() {
    if (this.#presentationId && this.#secret) {
      return
    }

    const { presentationId, secret } = this.#restoreSession() ?? {}
    if (presentationId && secret) {
      this.#presentationId = presentationId
      this.#secret = secret
    } else {
      this.#presentationId = crypto.randomUUID()
      this.#secret = crypto.randomUUID().replaceAll('-', '')
      this.#storeSession(this.#presentationId, this.#secret)
    }
  }

  active = $derived(this.#socketState === SOCKET_STATE.CONNECTED)

  /**
   * Called from the host presentation to accept incoming remote control.
   */
  host(
    currentSlideIndex: number,
    totalNoOfSlides: number,
    onSlideChange?: (index: number) => void,
  ) {
    if (this.#type === REMOTE_TYPE.CLIENT) {
      throw Error('Cannot be a host and a client at the same time')
    }

    // Web socket has already been started, just return the id and secret.
    if (this.#presentationId && this.#secret) {
      return {
        presentationId: this.#presentationId,
        secret: this.#secret,
      }
    }

    this.#type = REMOTE_TYPE.HOST
    this.#socketState = SOCKET_STATE.CONNECTING
    this.#setupSession()

    if (onSlideChange) {
      this.#onSlideChange = onSlideChange
    }

    const ws = new PartySocket({
      host: PUBLIC_PARTYKIT_HOST || 'localhost:1999',
      room: this.#presentationId,
      query: { secret: this.#secret, totalSlides: totalNoOfSlides.toString() },
    })

    ws.onopen = () => {
      this.#socketState = SOCKET_STATE.CONNECTED
      this.#send = (index: number) => ws.send(JSON.stringify({ slide: index }))

      ws.send(JSON.stringify({ slide: currentSlideIndex }))
    }

    ws.onmessage = (e: MessageEvent<string>) => {
      const { slide, status } = JSON.parse(e.data) as Message

      if (slide != null) {
        this.#onSlideChange(slide)
      }

      if (status) {
        this.#onStatusUpdate(status)
      }
    }

    return {
      presentationId: this.#presentationId,
      secret: this.#secret,
    }
  }

  /**
   * Called from the remote interface to connect to a hosting presentation.
   */
  connect(presentationId: string, secret?: string | null, onSlideChange?: (index: number) => void) {
    if (this.#type === REMOTE_TYPE.HOST) {
      throw Error('Cannot be a host and a client at the same time')
    }

    this.#type = REMOTE_TYPE.CLIENT
    this.#socketState = SOCKET_STATE.CONNECTING

    if (onSlideChange) {
      this.#onSlideChange = onSlideChange
    }

    const ws = new PartySocket({
      host: PUBLIC_PARTYKIT_HOST || 'localhost:1999',
      room: presentationId,
      query: { secret },
    })

    ws.onopen = () => {
      this.#socketState = SOCKET_STATE.CONNECTED
      this.#send = (index: number) => ws.send(JSON.stringify({ slide: index }))
    }

    ws.onmessage = (e: MessageEvent<string>) => {
      const { slide } = JSON.parse(e.data) as Message
      if (slide != null) {
        this.#onSlideChange(slide)
      }
    }
  }

  send(slideIndex: number) {
    this.#send(slideIndex)
  }

  onSlideChange(handler: (index: number) => void) {
    this.#onSlideChange = handler
  }

  onStatusUpdate(handler: (status: string) => void) {
    this.#onStatusUpdate = handler
  }
}

export const remote = new Remote()
