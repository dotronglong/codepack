/**
 * Represent for an event emitted by EventManager
 */
export default class Event {
  /**
   * Constructor
   * @param {string} name Event's name
   * @param {boolean} [parallel=false] Determine whether or not to allow running listeners in parallel
   */
  constructor(name, parallel = false) {
    /**
     * Event's name
     * @type {string}
     * @private
     */
    this._name = name

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

  /**
   * ReadOnly name of event
   * @returns {string}
   */
  get name() {
    return this._name
  }
}
/**
 * Name of event
 * Derived class must override this static attribute
 * @type {string}
 */
Event.NAME = ""