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

/**
 * Http Route
 */
export default class Route {
  /**
   * Constructor
   * @example
   * let route = new Route(
   *   "route_name",
   *   ["GET", "POST"],
   *   "/accounts/{id}",
   *   "{language}.domain.com",
   *   6969,
   *   {id: /\d+/, language: /[a-zA-Z]{2}/},
   *   {format: "json"},
   *   {useDb: true}
   * )
   *
   * @param {string} [name=""] Name of route, it should be an unique string
   * @param {Array|string} [methods=null] Accepted methods for route
   * @param {string} [path=""] Path of route, regexp string is allowed
   * @param {string} [host=null] Expected host, default is null to ignore host
   * @param {number} [port=null] Expected port, default is null to ignore port
   * @param {Object} [demands={}] Requirements for regexp host or path
   * @param {Object} [params={}] Additional parameters to route, it would be merged with matches result
   * @param {Object} [options={}] Route's options contain optional configuration
   */
  constructor(name = "",
              methods = null,
              path = "",
              host = null,
              port = null,
              demands = {},
              params = {},
              options = {}) {
    /**
     * Name of route
     * @type {string}
     */
    this.name = name

    /**
     * A list of accepted methods
     * @type {Array}
     */
    this.methods = methods

    /**
     * Path of request to be matched
     * @type {string}
     */
    this.path = path

    /**
     * Host of request to be verified
     * @type {string}
     */
    this.host = host

    /**
     * Expected port to be validated
     * @type {number}
     */
    this.port = port

    /**
     * Requirements of matching, it is optional of have pre-defined required properties of matching
     * @type {Object}
     */
    this.demands = demands

    /**
     * Additional or default parameters to be merged with final matches data
     * @type {Object}
     */
    this.params = params

    /**
     * Extra configuration for route
     * @type {Object}
     */
    this.options = options

    /**
     * Result of matching process
     * @type {Object}
     */
    this.matches = {}
  }

  /**
   * List of accepted methods
   * @returns {Array}
   */
  get methods() {
    return this._methods
  }

  /**
   * In case methods is a string, it would be converted to an array with single item
   * @param {Array} methods
   */
  set methods(methods) {
    if (methods !== null && Array.isArray(methods) === false) {
      methods = [methods]
    }

    this._methods = methods
  }

  /**
   * Extra configuration for route
   * @returns {Bag}
   */
  get options() {
    return this._options
  }

  /**
   * @param {Bag|Object} options
   */
  set options(options) {
    if (typeof options === "object") {
      if (options instanceof Bag) {
        this._options = options
      } else {
        this._options = new Bag(options)
      }
    }
  }

  /**
   * @returns {Object}
   */
  get matches() {
    return Object.assign({}, this._matches[SRC_HOST], this._matches[SRC_PATH])
  }

  /**
   * @param {Object} matches
   */
  set matches(matches) {
    this._matches = matches
  }

  /**
   * Convert an object to route instance
   * @param {Object} object
   * @returns {Route}
   */
  static from(object) {
    let route     = new this
    route.name    = object.name || ""
    route.methods = object.methods || []
    route.path    = object.path || ""
    route.host    = object.host || null
    route.port    = object.port || null
    route.options = object.options || {}
    route.demands = object.demands || {}
    route.params  = object.params || {}

    return route
  }

  /**
   * Define whether or not a request has been matched to this route
   * @param {Request} request
   * @returns {boolean}
   */
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

  /**
   * Prepare before matching
   * @protected
   */
  preMatch() {
    this.cleanUp()

    this.reservedHost = this.host
    this.reservedPath = this.path

    this.host = this.host === null ? null : scanAndReplace(validateRegExp(this.host), this.demands, this._matches[SRC_HOST])
    this.path = this.path === null ? null : scanAndReplace(validateRegExp(this.path), this.demands, this._matches[SRC_PATH])
  }

  /**
   * Perform actions after matching
   * @protected
   */
  postMatch() {
    this.host = this.reservedHost
    this.path = this.reservedPath

    this.reservedHost = null
    this.reservedPath = null
  }

  /**
   * Clean up data
   * @protected
   */
  cleanUp() {
    this._matches[SRC_HOST] = {}
    this._matches[SRC_PATH] = {}
  }
}
Route.MATCH_OPENING_TAG = "{"
Route.MATCH_CLOSING_TAG = "}"