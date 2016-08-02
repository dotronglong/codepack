import Bag from '../bag'
var http  = require('http')
var https = require('https')

const DEFAULT_HTTP_PORT  = 80
const DEFAULT_HTTPS_PORT = 443

class Server {
  constructor(port = null, host = null, backlog = 511, callback = null) {
    this.port     = port
    this.host     = host
    this.backlog  = backlog
    this.callback = callback
    this.name     = null
  }

  is(name) {
    return this.name === name
  }

  get server() {
    throw new Error('Derived class must implement getter of server property.')
  }

  set server(server) {
    this._server = server
  }

  start() {
    return this.server.listen(this.port, this.host, this.backlog, this.callback)
  }

  close() {
    this.server.close()
  }
}

class Http extends Server {
  constructor(port = DEFAULT_HTTP_PORT, host = null, backlog = 511, callback = null) {
    super(port, host, backlog, callback)
  }

  get server() {
    if (typeof this._server === 'undefined') {
      this._server = http.createServer()
    }

    return this._server
  }
}

class Https extends Server {
  constructor(options = {}, port = DEFAULT_HTTPS_PORT, host = null, backlog = 511, callback = null) {
    super(port, host, backlog, callback)
    this.options = new Bag(options)
  }

  get server() {
    return https.createServer(this.options.all())
  }
}

export default {Http, Https}