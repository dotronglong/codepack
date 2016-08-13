import Event from '../../event/event'

/**
 * Response Event which contains resonse before sending out
 */
export default class ResponseEvent extends Event {
  /**
   * Constructor
   * @param {Response} [response=null] The active response which is going to send out
   */
  constructor(response = null) {
    super('http.outgoing_response', false)

    /**
     * @type {Response}
     */
    this.response = response
  }
}
