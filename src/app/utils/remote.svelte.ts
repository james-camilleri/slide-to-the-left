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
    // If we've already got a presentation ID
    // and secret this is a waste of time.
    if (this.#presentationId && this.#secret) {
      return
    }

    // Restore the current session from local storage if it exists.
    const { presentationId, secret } = this.#restoreSession() ?? {}

    if (presentationId && secret) {
      // Use restored id & secret if we have them.
      this.#presentationId = presentationId
      this.#secret = secret
    } else {
      // Or create new ones if we don't.
      this.#presentationId = crypto.randomUUID()
      this.#secret = crypto.randomUUID().replaceAll('-', '')

      // Store session to local storage so the app will automatically
      // reconnect if it needs to be refreshed for some reason.
      this.#storeSession(this.#presentationId, this.#secret)
    }
  }

  // Keep track of whether an active remote session exists.
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

    // This handler function will be called whenever the slide changes.
    if (onSlideChange) {
      this.#onSlideChange = onSlideChange
    }

    // This is the magic that sets up the connection
    // to the PartyKit server. All connections made
    // with the same room will connect to the same
    // shared state. Any additional connection parameters
    // are passed along in the query.
    const ws = new PartySocket({
      host: PUBLIC_PARTYKIT_HOST || 'localhost:1999',
      room: this.#presentationId,
      query: { secret: this.#secret, totalSlides: totalNoOfSlides.toString() },
    })

    // Register a send function and respond with the current
    // slide once a new connection is established.
    ws.onopen = () => {
      this.#socketState = SOCKET_STATE.CONNECTED
      this.#send = (index: number) => ws.send(JSON.stringify({ slide: index }))
      this.#send(currentSlideIndex)
    }

    // Update the in-memory slide state when an update is received.
    ws.onmessage = (e: MessageEvent<string>) => {
      const { slide, status } = JSON.parse(e.data) as Message

      if (slide != null) {
        this.#onSlideChange(slide)
      }

      // This is currently just used to hide
      // the QR code after a remote connects.
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
