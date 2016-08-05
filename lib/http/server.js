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

  get kernel() {
    return this._kernel
  }

  set kernel(kernel) {
    this._kernel = kernel
  }

  start() {
    return this.kernel.listen(this.port, this.host, this.backlog, this.callback)
  }

  close() {
    this.kernel.close()
  }
}

class Http extends Server {
  constructor(port = DEFAULT_HTTP_PORT, host = null, backlog = 511, callback = null) {
    super(port, host, backlog, callback)
  }

  get kernel() {
    if (typeof this._kernel === 'undefined') {
      this._kernel = http.createServer()
    }

    return super.kernel
  }
}

class Https extends Server {
  constructor(options = {}, port = DEFAULT_HTTPS_PORT, host = null, backlog = 511, callback = null) {
    super(port, host, backlog, callback)
    this.options = new Bag(options)
  }

  get kernel() {
    if (typeof this._kernel === 'undefined') {
      this._kernel = https.createServer(this.options.all())
    }

    return super.kernel
  }
}

export default {Http, Https}