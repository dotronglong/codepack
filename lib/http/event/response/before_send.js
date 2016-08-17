import Event from "../../../event/event"

/**
 * Contains information about event which is emitted before sending response to client
 */
export default class BeforeSendEvent extends Event {
  /**
   * Constructor
   * @param {?Connection} connection Current active connection
   */
  constructor(connection) {
    super(BeforeSendEvent.NAME, false)

    /**
     * Current connection
     * @type {Connection}
     */
    this.connection = connection
  }
}
BeforeSendEvent.NAME = "response.before_send"