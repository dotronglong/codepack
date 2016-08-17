"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bag = require("../bag");

var _bag2 = _interopRequireDefault(_bag);

var _message = require("./message");

var _header = require("./header");

var _header2 = _interopRequireDefault(_header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var REQUEST_HOST = "host";
var REQUEST_PORT = "port";
var REQUEST_PATH = "path";
var REQUEST_METHOD = "method";
var REQUEST_ADDRESS = "address";
var REQUEST_LOCAL_ADDRESS = "localAddress";
var REQUEST_CLIENT_ADDRESS = "address";
var REQUEST_CLIENT_PORT = "port";

var types = {
  "application/json": "json",
  "application/xml": "xml",
  "text/plain": "text",
  "text/html": "html",
  "text/xml": "xml"
};

var parseQueryString = function parseQueryString(string) {
  var query = {};
  var args = string.match(/(&|^)([\w|\-]+=[\w|\-]+)/gi);
  args.forEach(function (arg) {
    if (arg[0] === "&") {
      arg = arg.substr(1);
    }
    var v = arg.split("=");
    if (v.length === 2) {
      query[v[0]] = v[1];
    }
  });
  return query;
};

/**
 * Http Request
 *
 * Contains information about request
 */

var Request = function (_Message) {
  _inherits(Request, _Message);

  function Request() {
    _classCallCheck(this, Request);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Request).apply(this, arguments));
  }

  _createClass(Request, [{
    key: "server",

    /**
     * Get server's information
     * @return {Object} An object which contains information of server
     */
    get: function get() {
      if (typeof this._server === "undefined") {
        this._server = new _bag2.default({
          host: null,
          port: null,
          path: "",
          method: null,
          address: null,
          localAddress: null
        });
      }

      return this._server;
    }

    /**
     * Set server's information
     * @param {Object} server
     */
    ,
    set: function set(server) {
      if ((typeof server === "undefined" ? "undefined" : _typeof(server)) === "object") {
        this.server.replace(server);
      } else {
        throw new Error("[Request::server] Input server must be an JSON object.");
      }
    }

    /**
     * Get client's information
     * @return {Object} An object which contains information of client
     */

  }, {
    key: "client",
    get: function get() {
      if (typeof this._client === "undefined") {
        this._client = new _bag2.default({
          address: null,
          port: null
        });
      }

      return this._client;
    }

    /**
     * Set client's information
     * @param  {Object} client
     */
    ,
    set: function set(client) {
      if ((typeof client === "undefined" ? "undefined" : _typeof(client)) === "object") {
        this.client.replace(client);
      } else {
        throw new Error("[Request::client] Input client must be an JSON object.");
      }
    }

    /**
     * Get host address
     * @return {string} The host addres of server, for instance, 127.0.0.1, localhost
     */

  }, {
    key: "host",
    get: function get() {
      return this.server.get(REQUEST_HOST);
    }

    /**
     * Set host address
     * @param  {string} host
     */
    ,
    set: function set(host) {
      this.server.set(REQUEST_HOST, host);
    }

    /**
     * Get server's port
     * @return {number} Server port
     */

  }, {
    key: "port",
    get: function get() {
      return this.server.get(REQUEST_PORT);
    }

    /**
     * Set server's port
     * @param {number} port
     */
    ,
    set: function set(port) {
      this.server.set(REQUEST_PORT, parseInt(port));
    }

    /**
     * Path of request
     * @return {string} Request's uri, it should always start with a slash ("/")
     */

  }, {
    key: "path",
    get: function get() {
      return this.server.get(REQUEST_PATH, "");
    }

    /**
     * Set request's path
     * @param {string} path
     */
    ,
    set: function set(path) {
      this.server.set(REQUEST_PATH, path);
    }

    /**
     * Request's method, for example, GET, POST, and PUT
     * @return {string}
     */

  }, {
    key: "method",
    get: function get() {
      return this.server.get(REQUEST_METHOD, Request.METHOD_GET);
    }

    /**
     * Set request's method
     * @param {string} method
     */
    ,
    set: function set(method) {
      this.server.set(REQUEST_METHOD, method);
    }

    /**
     * Set request's uri, a string follows right after question mark of path
     * @return {Bag}
     */

  }, {
    key: "query",
    get: function get() {
      if (typeof this._query === "undefined") {
        this._query = new _bag2.default();
      }

      return this._query;
    }

    /**
     * Set request's query
     * @param {string|object|Bag} query
     */
    ,
    set: function set(query) {
      if (typeof query === "string") {
        this._query = new _bag2.default(parseQueryString(query));
      } else if ((typeof query === "undefined" ? "undefined" : _typeof(query)) === "object") {
        if (query instanceof _bag2.default) {
          this._query = query;
        } else {
          this._query = new _bag2.default(query);
        }
      }
    }

    /**
     * Parameters are built from routing process by matching request host and path
     * @return {Bag}
     */

  }, {
    key: "params",
    get: function get() {
      if (typeof this._params === "undefined") {
        this._params = new _bag2.default();
      }

      return this._params;
    }

    /**
     * Set request's parameters
     * @param {Object} params
     */
    ,
    set: function set(params) {
      this.params.replace(params);
    }

    /**
     * Get server address
     * @return {string}
     */

  }, {
    key: "serverAddress",
    get: function get() {
      return this.server.get(REQUEST_ADDRESS);
    }

    /**
     * Get local address
     * @return {string}
     */

  }, {
    key: "localAddress",
    get: function get() {
      return this.server.get(REQUEST_LOCAL_ADDRESS);
    }

    /**
     * Get client's address
     * @return {string}
     */

  }, {
    key: "clientAddress",
    get: function get() {
      return this.client.get(REQUEST_CLIENT_ADDRESS);
    }

    /**
     * Get client port
     * @return {number}
     */

  }, {
    key: "clientPort",
    get: function get() {
      return this.client.get(REQUEST_CLIENT_PORT);
    }

    /**
     * Request type, it is defined base on the Content-Type header of Request
     * @return {string} For example, request has Content-Type = 'application/json' will have 'json' as type
     */

  }, {
    key: "type",
    get: function get() {
      if (typeof this._type === "undefined") {
        var matches = this.headers.get(_header2.default.CONTENT_TYPE, Request.DEFAULT_TYPE).match(/^([a-zA-z\/-]+)/i);

        if (matches !== null && Object.keys(types).indexOf(matches[1]) > -1) {
          this._type = types[matches[1]];
        } else {
          this._type = null;
        }
      }

      return this._type;
    }
  }]);

  return Request;
}(_message.Message);

exports.default = Request;

Request.METHOD_GET = "GET";
Request.METHOD_POST = "POST";
Request.METHOD_PUT = "PUT";
Request.METHOD_PATCH = "PATCH";
Request.METHOD_DELETE = "DELETE";
Request.METHOD_HEAD = "HEAD";
Request.METHOD_OPTION = "OPTION";

Request.DEFAULT_METHOD = "GET";
Request.DEFAULT_PATH = "/";
Request.DEFAULT_TYPE = "application/json";