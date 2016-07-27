import Request from '../request'
import Bag from '../../bag'

const SRC_HOST = 'host'
const SRC_PATH = 'path'

function scanAndReplace(text, source, dest) {
  if (text === null) {
    // do nothing
    return
  }

  const o = Route.MATCH_OPENING_TAG,
        c = Route.MATCH_CLOSING_TAG

  const pattern = `${o}(\\w+)${c}`,
        matches = text.match(new RegExp(pattern, 'ig')),
        args    = Object.keys(source)

  if (matches === null || !args.length || typeof dest !== 'object') {
    // do nothing
    return
  }

  // loop matches to replace in text
  matches.forEach((match) => {
    let replacement = /\w+/,
        argument    = match.replace(new RegExp(`${o}|${c}`, 'ig'), '')

    for (let i = 0; i < args.length; i++) {
      if (match === `${o}${args[i]}${c}`) {
        argument    = args[i]
        replacement = source[argument]
        break
      }
    }

    text           = text.replace(match, `(${replacement})`)
    dest[argument] = null
  })

  return text
}

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
    this.demands = demands
    this.options = options
    this._params = {}

    this._params[SRC_HOST] = {}
    this._params[SRC_PATH] = {}
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

  get params() {
    return Object.assign({}, this._params[SRC_HOST], this._params[SRC_PATH])
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
    this.host = scanAndReplace(this.host, this.demands, this._params[SRC_HOST])
    this.path = scanAndReplace(this.path, this.demands, this._params[SRC_PATH])
  }

  postMatch() {
    return true
  }
}
Route.MATCH_OPENING_TAG = '{'
Route.MATCH_CLOSING_TAG = '}'