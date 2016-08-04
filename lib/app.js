import Bag from './bag'
import Collection from './collection'
import EventManager from './event/manager'

class Plugin {
  constructor(app) {
    this.app = app
  }

  /**
   * Call when application is booting
   */
  onBoot() {}

  /**
   * Call when application is booted
   */
  onReady() {}
}

export default class App {
  constructor(options) {
    this.options = options
    this.servers = new Collection()
    this.plugins = new Collection()
    this.events  = new EventManager()
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

  register(plugin) {
    this.plugins.add(plugin)
  }

  setUp() {
    this.plugins.forEach(plugin => plugin.onBoot())
  }

  tearDown() {
    this.plugins.forEach(plugin => plugin.onReady())
  }

  run() {
    this.setUp()
    this.tearDown()
  }
}
App.Plugin = Plugin