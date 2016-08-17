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
    super(BeforeActionEvent.NAME, false)

    /**
     * Current connection
     * @type {Connection}
     */
    this.connection = connection
  }
}
BeforeActionEvent.NAME = "handler.before_action"