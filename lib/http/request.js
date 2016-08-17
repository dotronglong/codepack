import Bag from "../bag"
import {Message} from "./message"
import Header from "./header"

const REQUEST_HOST           = "host"
const REQUEST_PORT           = "port"
const REQUEST_PATH           = "path"
const REQUEST_METHOD         = "method"
const REQUEST_ADDRESS        = "address"
const REQUEST_LOCAL_ADDRESS  = "localAddress"
const REQUEST_CLIENT_ADDRESS = "address"
const REQUEST_CLIENT_PORT    = "port"

const types = {
  "application/json": "json",
  "application/xml": "xml",
  "text/plain": "text",
  "text/html": "html",
  "text/xml": "xml"
}

let parseQueryString = (string) => {
  let query = {}
  let args  = string.match(/(&|^)([\w|\-]+=[\w|\-]+)/gi)
  args.forEach((arg) => {
    if (arg[0] === "&") {
      arg = arg.substr(1)
    }
    let v = arg.split("=")
    if (v.length === 2) {
      query[v[0]] = v[1]
    }
  })
  return query
}

/**
 * Http Request
 *
 * Contains information about request
 */
export default class Request extends Message {
  /**
   * Get server's information
   * @return {Object} An object which contains information of server
   */
  get server() {
    if (typeof this._server === "undefined") {
      this._server = new Bag({
        host: null,
        port: null,
        path: "",
        method: null,
        address: null,
        localAddress: null
      })
    }

    return this._server
  }

  /**
   * Set server's information
   * @param {Object} server
   */
  set server(server) {
    if (typeof server === "object") {
      this.server.replace(server)
    } else {
      throw new Error("[Request::server] Input server must be an JSON object.")
    }
  }

  /**
   * Get client's information
   * @return {Object} An object which contains information of client
   */
  get client() {
    if (typeof this._client === "undefined") {
      this._client = new Bag({
        address: null,
        port: null
      })
    }

    return this._client
  }

  /**
   * Set client's information
   * @param  {Object} client
   */
  set client(client) {
    if (typeof client === "object") {
      this.client.replace(client)
    } else {
      throw new Error("[Request::client] Input client must be an JSON object.")
    }
  }

  /**
   * Get host address
   * @return {string} The host addres of server, for instance, 127.0.0.1, localhost
   */
  get host() {
    return this.server.get(REQUEST_HOST)
  }

  /**
   * Set host address
   * @param  {string} host
   */
  set host(host) {
    this.server.set(REQUEST_HOST, host)
  }

  /**
   * Get server's port
   * @return {number} Server port
   */
  get port() {
    return this.server.get(REQUEST_PORT)
  }

  /**
   * Set server's port
   * @param {number} port
   */
  set port(port) {
    this.server.set(REQUEST_PORT, parseInt(port))
  }

  /**
   * Path of request
   * @return {string} Request's uri, it should always start with a slash ("/")
   */
  get path() {
    return this.server.get(REQUEST_PATH, "")
  }

  /**
   * Set request's path
   * @param {string} path
   */
  set path(path) {
    this.server.set(REQUEST_PATH, path)
  }

  /**
   * Request's method, for example, GET, POST, and PUT
   * @return {string}
   */
  get method() {
    return this.server.get(REQUEST_METHOD, Request.METHOD_GET)
  }

  /**
   * Set request's method
   * @param {string} method
   */
  set method(method) {
    this.server.set(REQUEST_METHOD, method)
  }

  /**
   * Set request's uri, a string follows right after question mark of path
   * @return {Bag}
   */
  get query() {
    if (typeof this._query === "undefined") {
      this._query = new Bag()
    }

    return this._query
  }

  /**
   * Set request's query
   * @param {string|object|Bag} query
   */
  set query(query) {
    if (typeof query === "string") {
      this._query = new Bag(parseQueryString(query))
    } else if (typeof query === "object") {
      if (query instanceof Bag) {
        this._query = query
      } else {
        this._query = new Bag(query)
      }
    }
  }

  /**
   * Parameters are built from routing process by matching request host and path
   * @return {Bag}
   */
  get params() {
    if (typeof this._params === "undefined") {
      this._params = new Bag()
    }

    return this._params
  }

  /**
   * Set request's parameters
   * @param {Object} params
   */
  set params(params) {
    this.params.replace(params)
  }

  /**
   * Get server address
   * @return {string}
   */
  get serverAddress() {
    return this.server.get(REQUEST_ADDRESS)
  }

  /**
   * Get local address
   * @return {string}
   */
  get localAddress() {
    return this.server.get(REQUEST_LOCAL_ADDRESS)
  }

  /**
   * Get client's address
   * @return {string}
   */
  get clientAddress() {
    return this.client.get(REQUEST_CLIENT_ADDRESS)
  }

  /**
   * Get client port
   * @return {number}
   */
  get clientPort() {
    return this.client.get(REQUEST_CLIENT_PORT)
  }

  /**
   * Request type, it is defined base on the Content-Type header of Request
   * @return {string} For example, request has Content-Type = 'application/json' will have 'json' as type
   */
  get type() {
    if (typeof this._type === "undefined") {
      const matches = this.headers
            .get(Header.CONTENT_TYPE, Request.DEFAULT_TYPE)
            .match(/^([a-zA-z\/-]+)/i)

      if (matches !== null && Object.keys(types).indexOf(matches[1]) > -1) {
        this._type = types[matches[1]]
      } else {
        this._type = null
      }
    }

    return this._type
  }
}
Request.METHOD_GET    = "GET"
Request.METHOD_POST   = "POST"
Request.METHOD_PUT    = "PUT"
Request.METHOD_PATCH  = "PATCH"
Request.METHOD_DELETE = "DELETE"
Request.METHOD_HEAD   = "HEAD"
Request.METHOD_OPTION = "OPTION"

Request.DEFAULT_METHOD = "GET"
Request.DEFAULT_PATH   = "/"
Request.DEFAULT_TYPE   = "application/json"
