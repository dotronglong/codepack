import Event from "../../../event/event"

/**
 * Contains information about event which is emitted after calling handler's action
 */
export default class AfterActionEvent extends Event {
  /**
   * Constructor
   * @param {?Connection} connection Current active connection
   */
  constructor(connection) {
    super(AfterActionEvent.NAME, false)

    /**
     * Current connection
     * @type {Connection}
     */
    this.connection = connection
  }
}
AfterActionEvent.NAME = "handler.after_action"