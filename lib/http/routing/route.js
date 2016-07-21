import Request from '../request'
import Bag from '../../bag'

export default class Route {
  constructor(name = '',
              method = Request.METHOD_GET,
              path = '',
              host = null,
              port = null,
              demands = {},
              options = {}) {
    this.name    = name
    this.method  = method
    this.path    = path
    this.host    = host
    this.port    = port
    this.options = options
    this.demands = demands
    this.params  = params
  }

  get options() {
    return this._options
  }

  set options(options) {
    if (typeof options === 'object') {
      if (options instanceof Bag) {
        this._options = options
      } else {
        this._options = new Bag(options)
      }
    }
  }

  static from(object) {
    let route = new this
    if (typeof object.name !== 'undefined') {
      route.name = object.name
    }
    if (typeof object.method !== 'undefined') {
      route.method = object.method
    }
    if (typeof object.path !== 'undefined') {
      route.path = object.path
    }
    if (typeof object.host !== 'undefined') {
      route.host = object.host
    }
    if (typeof object.options !== 'undefined') {
      route.options = object.options
    }

    return route
  }

  match(path, host = null, port = null) {
    this.preMatch()

    if (host !== null && typeof host === 'string'
      && this.host !== null
      && host.match(`/${this.host}/i`) === null) {
      return false
    }

    if (port !== null) {
      if (typeof port === 'string') {
        port = parseInt(port)
      } else if (typeof port === 'number') {
        // do nothing
      }
      if (this.port !== null && this.port !== port) {
        return false
      }
    }

    return this.postMatch()
  }

  preMatch() {
    
  }

  postMatch() {
    return true
  }
}