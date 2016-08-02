import Bag from './bag'

export default class App {
  constructor(options) {
    this.options = options
    this.servers = []
  }

  get options() {
    if (typeof this._options === 'undefined') {
      this._options = new Bag()
    }

    return this._options
  }

  set options(options) {
    this._options.replace(options)
  }

  run() {
    
  }
}