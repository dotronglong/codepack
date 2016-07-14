export default class Event {
  constructor(name = '', parallel = true) {
    this.name     = name
    this.parallel = true
    this.continue = true
    this.error    = null
  }

  stop() {
    this.continue = false
  }

  get stopped() {
    return this.continue === false
  }
}
Event.StopPropagation = -1