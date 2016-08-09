import Bag from '../bag'
import Message from './message'
import Header from './header'
import Collection from '../collection'

const REQUEST_HOST           = 'host'
const REQUEST_PORT           = 'port'
const REQUEST_PATH           = 'path'
const REQUEST_METHOD         = 'method'
const REQUEST_ADDRESS        = 'address'
const REQUEST_LOCAL_ADDRESS  = 'localAddress'
const REQUEST_CLIENT_ADDRESS = 'address'
const REQUEST_CLIENT_PORT    = 'port'

const types = {
  'application/json': 'json',
  'application/xml': 'xml',
  'text/plain': 'text',
  'text/html': 'html',
  'text/xml': 'xml'
}

let parseQueryString = (string) => {
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

export default class Request extends Message {
  get server() {
    if (typeof this._server === 'undefined') {
      this._server = new Bag({
        host: null,
        port: null,
        path: '',
        method: null,
        address: null,
        localAddress: null
      })
    }

    return this._server
  }

  set server(server) {
    if (typeof server === 'object') {
      this.server.replace(server)
    } else {
      throw new Error('[Request::server] Input server must be an JSON object.')
    }
  }

  get client() {
    if (typeof this._client === 'undefined') {
      this._client = new Bag({
        address: null,
        port: null
      })
    }

    return this._client
  }

  set client(client) {
    if (typeof client === 'object') {
      this.client.replace(client)
    } else {
      throw new Error('[Request::client] Input client must be an JSON object.')
    }
  }

  get host() {
    return this.server.get(REQUEST_HOST)
  }

  set host(host) {
    this.server.set(REQUEST_HOST, host)
  }

  get port() {
    return this.server.get(REQUEST_PORT)
  }

  set port(port) {
    this.server.set(REQUEST_PORT, parseInt(port))
  }

  get path() {
    return this.server.get(REQUEST_PATH, '')
  }

  set path(path) {
    this.server.set(REQUEST_PATH, path)
  }

  get method() {
    return this.server.get(REQUEST_METHOD, Request.METHOD_GET)
  }

  set method(method) {
    this.server.set(REQUEST_METHOD, method)
  }

  get query() {
    if (typeof this._query === 'undefined') {
      this._query = new Bag()
    }

    return this._query
  }

  set query(query) {
    if (typeof query === 'string') {
      this._query = new Bag(parseQueryString(query))
    } else if (typeof query === 'object') {
      if (query instanceof Bag) {
        this._query = query
      } else {
        this._query = new Bag(query)
      }
    }
  }

  get params() {
    if (typeof this._params === 'undefined') {
      this._params = new Bag()
    }

    return this._params
  }

  set params(params) {
    this.params.replace(params)
  }

  get serverAddress() {
    return this.server.get(REQUEST_ADDRESS)
  }

  get localAddress() {
    return this.server.get(REQUEST_LOCAL_ADDRESS)
  }

  get clientAddress() {
    return this.client.get(REQUEST_CLIENT_ADDRESS)
  }

  get clientPort() {
    return this.client.get(REQUEST_CLIENT_PORT)
  }

  get type() {
    if (typeof this._type === 'undefined') {
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
Request.METHOD_GET    = 'GET'
Request.METHOD_POST   = 'POST'
Request.METHOD_PUT    = 'PUT'
Request.METHOD_PATCH  = 'PATCH'
Request.METHOD_DELETE = 'DELETE'
Request.METHOD_HEAD   = 'HEAD'
Request.METHOD_OPTION = 'OPTION'

Request.DEFAULT_METHOD = 'GET'
Request.DEFAULT_PATH   = '/'
Request.DEFAULT_TYPE   = 'application/json'
