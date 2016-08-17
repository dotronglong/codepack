import Event from "../../../event/event"

/**
 * Contains information about event which is emitted after calling handler's action
 */
export default class AfterSendEvent extends Event {
  /**
   * Constructor
   * @param {?Connection} connection Current active connection
   */
  constructor(connection) {
    super("handler.after_action", false)

    /**
     * Current connection
     * @type {Connection}
     */
    this.connection = connection
  }
}
