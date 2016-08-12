import Bag from '../bag'
var http  = require('http')
var https = require('https')

const DEFAULT_HTTP_PORT  = 80
const DEFAULT_HTTPS_PORT = 443

/**
 * To handle start and stop node server
 */
export class Server {
  /**
   * Constructor
   * @param {number} port Port of server to listen on
   * @param {string} host The host address to allow connections
   * @param {int} backlog Maximum length of the queue of pending connections
   * @param {function} callback Callback function to be called after server is started
   */
  constructor(port = null, host = null, backlog = 511, callback = null) {
    this.port     = port
    this.host     = host
    this.backlog  = backlog
    this.callback = callback
    this.name     = null
  }

  /**
   * Determine if server's name equal a proposed name or not
   * @param {string} name
   * @returns {boolean}
   */
  is(name) {
    return this.name === name
  }

  /**
   * Clone of original node server instance
   * @returns {*}
   */
  get kernel() {
    return this._kernel
  }

  /**
   * Set original node server instance as kernel
   * @param kernel
   */
  set kernel(kernel) {
    this._kernel = kernel
  }

  /**
   * Start server and listen for connections
   * @returns {*} The original node server instance
   */
  start() {
    return this.kernel.listen(this.port, this.host, this.backlog, this.callback)
  }

  /**
   * Close and stop the server
   */
  close() {
    this.kernel.close()
  }
}

/**
 * A HTTP based server to handle insecure http request
 */
export class ServerHttp extends Server {
  /**
   * Constructor
   * @param {number} port Port of server to listen on
   * @param {string} host The host address to allow connections
   * @param {int} backlog Maximum length of the queue of pending connections
   * @param {function} callback Callback function to be called after server is started
   */
  constructor(port = DEFAULT_HTTP_PORT, host = null, backlog = 511, callback = null) {
    super(port, host, backlog, callback)
  }

  /**
   * Return original node http server
   * @returns {http.Server}
   */
  get kernel() {
    if (typeof this._kernel === 'undefined') {
      this._kernel = http.createServer()
    }

    return super.kernel
  }
}

/**
 * A HTTPS based server to handle secure http request through SSL
 */
export class ServerHttps extends Server {
  /**
   * Constructor
   * @param {{}} options Optional configuration for https server, for instance, certificates
   * @param {number} port Port of server to listen on
   * @param {string} host The host address to allow connections
   * @param {int} backlog Maximum length of the queue of pending connections
   * @param {function} callback Callback function to be called after server is started
   */
  constructor(options = {}, port = DEFAULT_HTTPS_PORT, host = null, backlog = 511, callback = null) {
    super(port, host, backlog, callback)
    this.options = new Bag(options)
  }

  /**
   * Return original node http server
   * @returns {https.Server}
   */
  get kernel() {
    if (typeof this._kernel === 'undefined') {
      this._kernel = https.createServer(this.options.all())
    }

    return super.kernel
  }
}