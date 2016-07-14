export default class Event {
  constructor(name = '', parallel = true) {
    this.name      = name
    this.parallel  = parallel
    this.continue  = true
    this.exception = null
  }

  stop() {
    this.continue = false
    return true
  }

  get stopped() {
    return this.continue === false
  }
}