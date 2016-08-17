import ResponseBeforeSendEvent from "./event/response/before_send"
import ResponseAfterSendEvent from "./event/response/after_send"

/**
 * Connect handler
 */
export default class Handler {
  /**
   * Constructor
   * @param {!EventManager} events Event manager which should be passed from {App}
   * @param {!Connection} connection Current active connection
   */
  constructor(events, connection) {
    /**
     * Event manager
     * @access protected
     * @type {EventManager}
     */
    this.events = events

    /**
     * Current active connection
     * @access protected
     * @type {Connection}
     */
    this.connnection = connection
  }

  /**
   * Get current request from connection
   * @return {Request}
   */
  get request() {
    return this.connection.request
  }

  /**
   * Get current response from connection
   * @return {Response}
   */
  get response() {
    return this.connection.response
  }

  /**
   * Get current processing server
   * @return {Server}
   */
  get server() {
    return this.connection.server
  }

  /**
   * Send response out to client
   */
  reply() {
    this.events.emit(new ResponseBeforeSendEvent(this.connnection))
    this.response.send()
    this.events.emit(new ResponseAfterSendEvent(this.connnection))
  }
}
