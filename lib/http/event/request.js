import Event from '../../event/event'

/**
 * Event will be emiited if there is an incoming request to the server
 */
export default class RequestEvent extends Event {
  /**
   * Constructor
   * @param {?Connection} [connection=null] Active connection to the server
   */
  constructor(connection = null) {
    super('http.incoming_request', false)

    /**
     * Current active connection
     * @type {Connection}
     */
    this.connection = connection
  }
}
