import type * as Party from 'partykit/server'

export default class Server implements Party.Server {
  // The secret to "authenticate" clients against.
  #secret: string | null = null
  // Store the IDs of all authorised clients.
  #authorised = new Set<string>()
  // The primary shared state.
  #currentSlide = 0
  // Just used to ensure that the current slide
  // never goes past the end of the presentation.
  #totalSlides = 0

  constructor(readonly room: Party.Room) {}

  // This is called when any client connects to the PartyKit server.
  onConnect(connection: Party.Connection, { request }: Party.ConnectionContext) {
    const secret = new URL(request.url).searchParams.get('secret')
    const totalSlides = new URL(request.url).searchParams.get('totalSlides')

    if (secret) {
      // The first connection should be the host setting up the room.
      if (!this.#secret) {
        this.#secret = secret

        if (totalSlides != null) {
          this.#totalSlides = Number(totalSlides)
        }
      }

      this.#authorised.add(connection.id)
    }

    // Notify all other clients that a new connection
    // has been made. This is currently only used to hide
    // the connection QR code on the main presentation.
    this.room.broadcast(JSON.stringify({ status: 'new-connection' }), [connection.id])

    // Propagate the current slide to any collecting client.
    connection.send(JSON.stringify({ slide: this.#currentSlide }))
  }

  // This is called for each message sent to the server.
  onMessage(message: string, sender: Party.Connection) {
    // Block unauthorised clients from updating the current slide.
    if (!this.#authorised.has(sender.id)) {
      return
    }

    const { slide } = JSON.parse(message) as { slide: number }
    const sanitisedIndex = Math.max(0, Math.min(this.#totalSlides - 1, slide))

    if (sanitisedIndex != null && sanitisedIndex !== this.#currentSlide) {
      this.#currentSlide = slide

      // Broadcast to all listeners, including the original sender.
      this.room.broadcast(JSON.stringify({ slide: sanitisedIndex }))
    }
  }
}
