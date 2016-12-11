import Bag from '../bag'
import Message from './message'

/**
 * Http Request
 *
 * Contains information about request
 */
export default class Request extends Message {
  /**
   * Constructor
   * @param {?Object} resource
   */
  constructor(resource = null) {
    super()
    this.setQuery(new Bag())
    this.setServer(new Bag())
    this.setClient(new Bag())
    this.resource = resource
  }

  /**
   * Set original resource
   * @param {*} resource
   */
  setResource(resource) {
    super.setResource(resource)
  }

  /**
   * Get request's query
   * @returns {Bag}
   */
  getQuery() {
    return this._query
  }

  /**
   * Set request's query
   * @param {Bag|Object|string} query
   */
  setQuery(query) {
    if (query instanceof Bag) {
      this._query = query
    } else if (typeof query === 'object') {
      this._query = new Bag(query)
    } else if (typeof query === 'string') {
      this._query = new Bag(this._parseQueryString(query))
    } else {
      throw new Error('The query of request must be either a string, an instance of Bag or an object.')
    }
  }

  /**
   * Parse string into query
   * @param {string} string Query's string
   * @returns {Object}
   * @private
   */
  _parseQueryString(string) {
    let query = {}
    let args  = string.match(/(&|^)([\w|\-]+=[\w|\-]+)/gi)
    args.forEach((arg) => {
      if (arg[0] === '&') {
        arg = arg.substr(1)
      }
      let v = arg.split('=')
      if (v.length === 2) {
        query[v[0]] = v[1]
      }
    })
    return query
  }

  /**
   * Return server's information
   * @returns {Bag}
   */
  getServer() {
    return this._server
  }

  /**
   * Set server's information
   * @param {Bag|Object} [server={}]
   */
  setServer(server = {}) {
    if (server instanceof Bag) {
      this._server = server
    } else if (typeof server === 'object') {
      this._server = new Bag(server)
    } else {
      throw new Error('The request\'s server information must be either an instance of Bag or an object.')
    }
  }

  /**
   * Return client's information
   * @returns {Bag}
   */
  getClient() {
    return this._client
  }

  /**
   * Set client's information
   * @param {Bag|Object} [client={}]
   */
  setClient(client = {}) {
    if (client instanceof Bag) {
      this._client = client
    } else if (typeof client === 'object') {
      this._client = new Bag(client)
    } else {
      throw new Error('The request\'s client information must be either an instance of Bag or an object.')
    }
  }
}
Request.METHOD_GET    = 'GET'
Request.METHOD_POST   = 'POST'
Request.METHOD_PUT    = 'PUT'
Request.METHOD_PATCH  = 'PATCH'
Request.METHOD_DELETE = 'DELETE'
Request.METHOD_HEAD   = 'HEAD'
Request.METHOD_OPTION = 'OPTION'

Request.DEFAULT_METHOD = 'GET'
Request.DEFAULT_PATH   = '/'

Request.SERVER_HOST          = 'host'
Request.SERVER_PORT          = 'port'
Request.SERVER_PATH          = 'path'
Request.SERVER_METHOD        = 'method'
Request.SERVER_ADDRESS       = 'address'
Request.SERVER_LOCAL_ADDRESS = 'localAddress'
Request.CLIENT_ADDRESS       = 'address'
Request.CLIENT_PORT          = 'port'
