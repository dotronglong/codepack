import Event from '../../event/event'

export default class ResponseEvent extends Event {
  constructor(response = null) {
    super('http.outgoing_response', false)

    this.response = response
  }
}