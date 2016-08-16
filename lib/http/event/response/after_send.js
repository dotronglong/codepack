import Event from '../../../event/event'

/**
 * Contains information about event which is emitted after sending response to client
 */
export default class AfterSendEvent extends Event {
  /**
   * Constructor
   * @param {?Connection} connection Current active connection
   */
  constructor(connection) {
    super('response.after_send', false)

    /**
     * Current connection
     * @type {Connection}
     */
    this.connection = connection
  }
}
