import Event from '../../event/event'

/**
 * Event will be emiited if there is an incoming request to the server
 */
export default class RequestEvent extends Event {
  /**
   * Constructor
   * @param {?Connection} [connection=null] Active connection to the server
   * @param {?Server} [server=null] Current processing server
   */
  constructor(connection = null, server = null) {
    super('http.incoming_request', false)

    /**
     * @type {Connection}
     */
    this.connection = connection

    /**
     * @type {Server}
     */
    this.server = server
  }
}
