import Bag from "./bag"
import Router from "./http/routing/router"
import Collection from "./collection"
import EventManager from "./event/manager"

/**
 * Application's Plugin
 */
export class Plugin {
  /**
   * Constructor
   * @param {App} app Current application
   */
  constructor(app) {
    /**
     * Application
     * @type {App}
     */
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
  /**
   * Constructor
   * @param {Object} options Application's configuration
   */
  constructor(options) {
    /**
     * App configuration
     * @type {Bag}
     */
    this.options = options

    /**
     * Server pool
     * @type {Collection}
     */
    this.servers = new Collection()

    /**
     * App's plugins
     * @type {Collection}
     */
    this.plugins = new Collection()

    /**
     * Event Manager
     * @type {EventManager}
     */
    this.events = new EventManager()

    /**
     * Router
     * @type {Router}
     */
    this.router = new Router()
  }

  get options() {
    if (typeof this._options === "undefined") {
      this._options = new Bag()
    }

    return this._options
  }

  set options(options) {
    this.options.replace(options)
  }

  setUp() {
    let plugins = this.plugins.all().map(plugin => {
      if (typeof plugin === 'function') {
        plugin = new plugin(this)
      }
      if (typeof plugin === 'object') {
        if (plugin instanceof Plugin) {
          plugin.app = this
        } else {
          throw new Error("[App#setUp] plugin must be an instance of Plugin")
        }
      } else {
        throw new Error("[App#setUp] This type of plugin is not supported.")
      }

      /* Run onBoot */
      plugin.onBoot()

      return plugin
    })
    this.plugins.replace(plugins)
  }

  tearDown() {
    this.plugins.forEach(plugin => plugin.onReady())
  }

  run() {
    this.setUp()
    this.tearDown()
  }
}
