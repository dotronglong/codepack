import Event from "../../../event/event"

/**
 * Contains information about event which is emitted before calling handler's action
 */
export default class BeforeActionEvent extends Event {
  /**
   * Constructor
   * @param {?Connection} connection Current active connection
   */
  constructor(connection) {
    super("handler.before_action", false)

    /**
     * Current connection
     * @type {Connection}
     */
    this.connection = connection
  }
}
