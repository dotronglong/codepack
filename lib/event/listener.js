const LIMIT_NONE  = null
const LIMIT_ONCE  = 1
const LIMIT_TWICE = 2

const PRIORITY_LOW    = 1
const PRIORITY_NORMAL = 5
const PRIORITY_HIGH   = 10

/**
 * Event Listener
 *
 * Process event when it is emitted by the EventManager
 */
export default class Listener {
  /**
   * Constructor
   * @param {!function} runner Callback function to process event, it would receive an event as input
   * @param {?number} [priority=5] Determine the order of listener in running queue
   * @param {?number} [limit=null] Define if this listen could only run at a specific times
   */
  constructor(runner, priority = PRIORITY_NORMAL, limit = LIMIT_NONE) {
    /**
     * @access protected
     * @type {function}
     */
    this.runner = runner

    /**
     * @access protected
     * @type {number}
     */
    this.priority = priority

    /**
     * @access protected
     * @type {number}
     */
    this.limit = limit

    /**
     * @access private
     * @type {function}
     */
    this.cbDone = null

    /**
     * @access private
     * @type {function}
     */
    this.cbError = null
  }

  /**
   * Callback function to be called right after event is fired and stopped completely
   * @param {!function} callback
   * @returns {Listener} The current listener object
   */
  done(callback) {
    this.cbDone = callback
    return this
  }

  /**
   * Callback function to be run if there is an error when processing event
   * @param {!function} callback
   * @returns {Listener} The current listener object
   */
  error(callback) {
    this.cbError = callback
    return this
  }
}
Listener.LIMIT_NONE  = LIMIT_NONE
Listener.LIMIT_ONCE  = LIMIT_ONCE
Listener.LIMIT_TWICE = LIMIT_TWICE

Listener.PRIORITY_LOW    = PRIORITY_LOW
Listener.PRIORITY_NORMAL = PRIORITY_NORMAL
Listener.PRIORITY_HIGH   = PRIORITY_HIGH
