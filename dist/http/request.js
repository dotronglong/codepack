'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _bag = require('../bag');

var _bag2 = _interopRequireDefault(_bag);

var _message = require('./message');

var _message2 = _interopRequireDefault(_message);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Http Request
 *
 * Contains information about request
 */
var Request = function (_Message) {
  _inherits(Request, _Message);

  /**
   * Constructor
   * @param {?Object} resource
   */
  function Request() {
    var resource = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    _classCallCheck(this, Request);

    var _this = _possibleConstructorReturn(this, (Request.__proto__ || Object.getPrototypeOf(Request)).call(this));

    _this.setQuery(new _bag2.default());
    _this.setServer(new _bag2.default());
    _this.setClient(new _bag2.default());
    _this.resource = resource;
    return _this;
  }

  /**
   * Set original resource
   * @param {*} resource
   */


  _createClass(Request, [{
    key: 'setResource',
    value: function setResource(resource) {
      _get(Request.prototype.__proto__ || Object.getPrototypeOf(Request.prototype), 'setResource', this).call(this, resource);
    }

    /**
     * Get request's query
     * @returns {Bag}
     */

  }, {
    key: 'getQuery',
    value: function getQuery() {
      return this._query;
    }

    /**
     * Set request's query
     * @param {Bag|Object|string} query
     */

  }, {
    key: 'setQuery',
    value: function setQuery(query) {
      if (query instanceof _bag2.default) {
        this._query = query;
      } else if ((typeof query === 'undefined' ? 'undefined' : _typeof(query)) === 'object') {
        this._query = new _bag2.default(query);
      } else if (typeof query === 'string') {
        this._query = new _bag2.default(this._parseQueryString(query));
      } else {
        throw new Error('The query of request must be either a string, an instance of Bag or an object.');
      }
    }

    /**
     * Parse string into query
     * @param {string} string Query's string
     * @returns {Object}
     * @private
     */

  }, {
    key: '_parseQueryString',
    value: function _parseQueryString(string) {
      var query = {};
      var args = string.match(/(&|^)([\w|\-]+=[\w|\-]+)/gi);
      args.forEach(function (arg) {
        if (arg[0] === '&') {
          arg = arg.substr(1);
        }
        var v = arg.split('=');
        if (v.length === 2) {
          query[v[0]] = v[1];
        }
      });
      return query;
    }

    /**
     * Return server's information
     * @returns {Bag}
     */

  }, {
    key: 'getServer',
    value: function getServer() {
      return this._server;
    }

    /**
     * Set server's information
     * @param {Bag|Object} [server={}]
     */

  }, {
    key: 'setServer',
    value: function setServer() {
      var server = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (server instanceof _bag2.default) {
        this._server = server;
      } else if ((typeof server === 'undefined' ? 'undefined' : _typeof(server)) === 'object') {
        this._server = new _bag2.default(server);
      } else {
        throw new Error('The request\'s server information must be either an instance of Bag or an object.');
      }
    }

    /**
     * Return client's information
     * @returns {Bag}
     */

  }, {
    key: 'getClient',
    value: function getClient() {
      return this._client;
    }

    /**
     * Set client's information
     * @param {Bag|Object} [client={}]
     */

  }, {
    key: 'setClient',
    value: function setClient() {
      var client = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (client instanceof _bag2.default) {
        this._client = client;
      } else if ((typeof client === 'undefined' ? 'undefined' : _typeof(client)) === 'object') {
        this._client = new _bag2.default(client);
      } else {
        throw new Error('The request\'s client information must be either an instance of Bag or an object.');
      }
    }
  }]);

  return Request;
}(_message2.default);

exports.default = Request;

Request.METHOD_GET = 'GET';
Request.METHOD_POST = 'POST';
Request.METHOD_PUT = 'PUT';
Request.METHOD_PATCH = 'PATCH';
Request.METHOD_DELETE = 'DELETE';
Request.METHOD_HEAD = 'HEAD';
Request.METHOD_OPTION = 'OPTION';

Request.DEFAULT_METHOD = 'GET';
Request.DEFAULT_PATH = '/';

Request.SERVER_HOST = 'host';
Request.SERVER_PORT = 'port';
Request.SERVER_PATH = 'path';
Request.SERVER_METHOD = 'method';
Request.SERVER_ADDRESS = 'address';
Request.SERVER_LOCAL_ADDRESS = 'localAddress';
Request.CLIENT_ADDRESS = 'address';
Request.CLIENT_PORT = 'port';