import Bag from "../../bag"

const SRC_HOST = "host"
const SRC_PATH = "path"

function scanAndReplace(text, source, target) {
  if (text === null) {
    // do nothing
    return
  }

  const o = Route.MATCH_OPENING_TAG,
        c = Route.MATCH_CLOSING_TAG

  const pattern = `${o}(\\w+)${c}`,
        matches = text.match(new RegExp(pattern, "ig")),
        args    = Object.keys(source)

  if (matches === null || typeof target !== "object") {
    // do nothing
    return text
  }

  // loop matches to replace in text
  matches.forEach((match) => {
    let replacement = /\w+/,
        argument    = match.replace(new RegExp(`${o}|${c}`, "ig"), "")

    for (let i = 0; i < args.length; i++) {
      if (match === `${o}${args[i]}${c}`) {
        argument    = args[i]
        replacement = source[argument]
        break
      }
    }

    if (typeof replacement === "object" && replacement instanceof RegExp) {
      replacement = replacement.toString()
      replacement = replacement.replace(/^\/(.*)\/[a-z]*$/ig, "$1")
    }

    text             = text.replace(match, `(${replacement})`)
    target[argument] = null
  })

  return text
}

function matchAndApply(text, pattern, target) {
  if (text === undefined || pattern === undefined) {
    return false
  }

  if (text === null) {
    return true
  }

  const matches = text.match(pattern)
  if (matches === null) {
    return false
  }

  const args = Object.keys(target)
  for (let i = 1; i < matches.length; i++) {
    target[args[i - 1]] = matches[i]
  }

  return true
}

function validateRegExp(target) {
  if (typeof target === "object" && target instanceof RegExp) {
    target = target.toString()
  }

  // consider to check for string only?
  return `^${target}$`
}

export default class Route {
  constructor(name = "",
              methods = null,
              path = "",
              host = null,
              port = null,
              demands = {},
              params = {},
              options = {}) {
    this.name    = name
    this.methods = methods
    this.path    = path
    this.host    = host
    this.port    = port
    this.demands = demands
    this.params  = params
    this.options = options
    this.matches = {}
  }

  get methods() {
    return this._methods
  }

  set methods(methods) {
    if (methods !== null && Array.isArray(methods) === false) {
      methods = [methods]
    }

    this._methods = methods
  }

  get options() {
    return this._options
  }

  set options(options) {
    if (typeof options === "object") {
      if (options instanceof Bag) {
        this._options = options
      } else {
        this._options = new Bag(options)
      }
    }
  }

  get matches() {
    return Object.assign({}, this._matches[SRC_HOST], this._matches[SRC_PATH])
  }

  set matches(matches) {
    this._matches = matches
  }

  static from(object) {
    let route = new this
    if (typeof object.name !== "undefined") {
      route.name = object.name
    }
    if (typeof object.methods !== "undefined") {
      route.methods = object.methods
    }
    if (typeof object.path !== "undefined") {
      route.path = object.path
    }
    if (typeof object.host !== "undefined") {
      route.host = object.host
    }
    if (typeof object.port !== "undefined") {
      route.port = object.port
    }
    if (typeof object.options !== "undefined") {
      route.options = object.options
    }
    if (typeof object.demands !== "undefined") {
      route.demands = object.demands
    }

    return route
  }

  match(request) {
    /* Run pre-actions */
    this.preMatch()

    let isMatched = false
    if (
      (this.methods === null || this.methods.indexOf(request.method) >= 0)
      && (this.host === null || matchAndApply(request.host, this.host, this._matches[SRC_HOST]))
      && (this.path === null || matchAndApply(request.path, this.path, this._matches[SRC_PATH]))
      && (this.port === null || (request.port !== null && request.port === this.port))
    ) {
      isMatched = true
    }

    /* Run post-actions */
    this.postMatch()

    return isMatched
  }

  preMatch() {
    this.cleanUp()

    this.reservedHost = this.host
    this.reservedPath = this.path

    this.host = this.host === null ? null : scanAndReplace(validateRegExp(this.host), this.demands, this._matches[SRC_HOST])
    this.path = this.path === null ? null : scanAndReplace(validateRegExp(this.path), this.demands, this._matches[SRC_PATH])
  }

  postMatch() {
    this.host = this.reservedHost
    this.path = this.reservedPath

    this.reservedHost = null
    this.reservedPath = null
  }

  cleanUp() {
    this._matches[SRC_HOST] = {}
    this._matches[SRC_PATH] = {}
  }
}
Route.MATCH_OPENING_TAG = "{"
Route.MATCH_CLOSING_TAG = "}"