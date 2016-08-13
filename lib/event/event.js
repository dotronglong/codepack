/**
 * Represent for an event emitted by EventManager
 */
export default class Event {
  /**
   * Constructor
   * @param {?string} [name=''] Name of event
   * @param {boolean} [parallel=false] Determine whether or not to allow running listeners in parallel
   */
  constructor(name = '', parallel = false) {
    /**
     * @type {string}
     */
    this.name      = name

    /**
     * @type {boolean}
     */
    this.parallel  = parallel

    /**
     * @access private
     * @type {boolean}
     */
    this.continue  = true

    /**
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
