import Event from '../../event/event'

export default class RequestEvent extends Event {
  constructor(connection = null) {
    super('http.incoming_request', false)

    this.connection = connection
  }
}