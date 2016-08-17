/**
 * Represent for an event emitted by EventManager
 */
export default class Event {
  /**
   * Constructor
   * @param {boolean} [parallel=false] Determine whether or not to allow running listeners in parallel
   */
  constructor(parallel = false) {
    /**
     * Define whether or not to run this event's listeners in parallel
     * @type {boolean}
     */
    this.parallel = parallel

    /**
     * @access private
     * @type {boolean}
     */
    this.continue = true

    /**
     * Detail exception if there was an error
     * @type {Error}
     */
    this.exception = null
  }

  /**
   * Stop running event any furthermore
   */
  stop() {
    this.continue = false
  }

  /**
   * Determine if the event is actually stopped or not
   * @returns {boolean}
   */
  get stopped() {
    return this.continue === false
  }
}
/**
 * Name of event
 * Derived class must override this static attribute
 * @type {string}
 */
Event.NAME = ""