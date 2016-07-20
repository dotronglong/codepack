import Request from '../request'
import Bag from '../../bag'

export default class Route {
  constructor(name = '', method = Request.METHOD_GET, path = '', host = null, options = {}) {
    this.name    = name
    this.method  = method
    this.path    = path
    this.host    = host
    this.options = options
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
    }if (typeof object.options !== 'undefined') {
      route.options = object.options
    }

    return route
  }
}