"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServerHttps = exports.ServerHttp = exports.Server = undefined;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bag = require("../bag");

var _bag2 = _interopRequireDefault(_bag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var http = require("http");
var https = require("https");

var DEFAULT_HTTP_PORT = 80;
var DEFAULT_HTTPS_PORT = 443;

/**
 * @typedef {Object} NodeHttpServer
 */

/**
 * @typedef {Object} NodeHttpsServer
 */

/**
 * To handle start and stop node server
 */

var Server = exports.Server = function () {
  /**
   * Constructor
   * @param {?number} [port=null] Port of server to listen on
   * @param {?string} [host=null] The host address to allow connections
   * @param {?number} [backlog=511] Maximum length of the queue of pending connections
   * @param {?function} [callback=null] Callback function to be called after server is started
   */

  function Server() {
    var port = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
    var host = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
    var backlog = arguments.length <= 2 || arguments[2] === undefined ? 511 : arguments[2];
    var callback = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

    _classCallCheck(this, Server);

    /**
     * @type {number}
     */
    this.port = port;

    /**
     * @type {string}
     */
    this.host = host;

    /**
     * @type {number}
     */
    this.backlog = backlog;

    /**
     * @type {function}
     */
    this.callback = callback;

    /**
     * @type {string}
     */
    this.name = null;
  }

  /**
   * Determine if server's name equal a proposed name or not
   * @param {!string} name
   * @returns {boolean}
   */


  _createClass(Server, [{
    key: "is",
    value: function is(name) {
      return this.name === name;
    }

    /**
     * Clone of original node server instance
     * @returns {Object}
     */

  }, {
    key: "start",


    /**
     * Start server and listen for connections
     * @returns {Object} Original node server instance
     */
    value: function start() {
      return this.kernel.listen(this.port, this.host, this.backlog, this.callback);
    }

    /**
     * Close and stop the server
     */

  }, {
    key: "close",
    value: function close() {
      this.kernel.close();
    }
  }, {
    key: "kernel",
    get: function get() {
      return this._kernel;
    }

    /**
     * Set original node server instance as kernel
     * @param {Object} kernel
     */
    ,
    set: function set(kernel) {
      this._kernel = kernel;
    }
  }]);

  return Server;
}();

/**
 * A HTTP based server to handle insecure http request
 */


var ServerHttp = exports.ServerHttp = function (_Server) {
  _inherits(ServerHttp, _Server);

  /**
   * Constructor
   *
   * @param {?number} [port=80] Port of server to listen on
   * @param {?string} [host=null] The host address to allow connections
   * @param {?number} [backlog=511] Maximum length of the queue of pending connections
   * @param {?function} [callback=null] Callback function to be called after server is started
   */

  function ServerHttp() {
    var port = arguments.length <= 0 || arguments[0] === undefined ? DEFAULT_HTTP_PORT : arguments[0];
    var host = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
    var backlog = arguments.length <= 2 || arguments[2] === undefined ? 511 : arguments[2];
    var callback = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

    _classCallCheck(this, ServerHttp);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ServerHttp).call(this, port, host, backlog, callback));
  }

  /**
   * Return original node http server
   * @returns {NodeHttpServer}
   */


  _createClass(ServerHttp, [{
    key: "kernel",
    get: function get() {
      if (typeof this._kernel === "undefined") {
        this._kernel = http.createServer();
      }

      return _get(Object.getPrototypeOf(ServerHttp.prototype), "kernel", this);
    }
  }]);

  return ServerHttp;
}(Server);

/**
 * A HTTPS based server to handle secure http request through SSL
 */


var ServerHttps = exports.ServerHttps = function (_Server2) {
  _inherits(ServerHttps, _Server2);

  /**
   * Constructor
   * @param {?{}} [options={}] Optional configuration for https server, for instance, certificates
   * @param {?number} [port=443] Port of server to listen on
   * @param {?string} [host=null] The host address to allow connections
   * @param {?number} [backlog=511] Maximum length of the queue of pending connections
   * @param {?function} [callback=null] Callback function to be called after server is started
   */

  function ServerHttps() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var port = arguments.length <= 1 || arguments[1] === undefined ? DEFAULT_HTTPS_PORT : arguments[1];
    var host = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
    var backlog = arguments.length <= 3 || arguments[3] === undefined ? 511 : arguments[3];
    var callback = arguments.length <= 4 || arguments[4] === undefined ? null : arguments[4];

    _classCallCheck(this, ServerHttps);

    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(ServerHttps).call(this, port, host, backlog, callback));

    _this2.options = new _bag2.default(options);
    return _this2;
  }

  /**
   * Return original node http server
   * @returns {NodeHttpsServer}
   */


  _createClass(ServerHttps, [{
    key: "kernel",
    get: function get() {
      if (typeof this._kernel === "undefined") {
        this._kernel = https.createServer(this.options.all());
      }

      return _get(Object.getPrototypeOf(ServerHttps.prototype), "kernel", this);
    }
  }]);

  return ServerHttps;
}(Server);