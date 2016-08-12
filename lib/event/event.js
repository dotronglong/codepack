/**
 * Represent for an event emitted by EventManager
 */
export default class Event {
  /**
   * Constructor
   * @param {string} name Name of event
   * @param {boolean} parallel Determine whether or not to allow running listeners in parallel
   */
  constructor(name = '', parallel = false) {
    this.name      = name
    this.parallel  = parallel
    this.continue  = true
    this.exception = null
  }

  /**
   * Stop running event furthermore
   * @returns {boolean}
   */
  stop() {
    this.continue = false
    return true
  }

  /**
   * Determine if the event is actually stopped or not
   * @returns {boolean}
   */
  get stopped() {
    return this.continue === false
  }
}