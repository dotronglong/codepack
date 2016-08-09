import Event from '../../event/event'

export default class RequestEvent extends Event {
  constructor(connection = null, server = null) {
    super('http.incoming_request', false)

    this.connection = connection
    this.server     = server
  }
}