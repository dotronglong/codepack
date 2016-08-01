'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bag = require('../bag');

var _bag2 = _interopRequireDefault(_bag);

var _message = require('./message');

var _message2 = _interopRequireDefault(_message);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var REQUEST_HOST = 'host';
var REQUEST_PORT = 'port';
var REQUEST_PATH = 'path';
var REQUEST_METHOD = 'method';
var REQUEST_ADDRESS = 'address';
var REQUEST_LOCAL_ADDRESS = 'localAddress';
var REQUEST_CLIENT_ADDRESS = 'address';
var REQUEST_CLIENT_PORT = 'port';

var parseQueryString = function parseQueryString(string) {
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
};

var Request = function (_Message) {
  _inherits(Request, _Message);

  function Request() {
    _classCallCheck(this, Request);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Request).apply(this, arguments));
  }

  _createClass(Request, [{
    key: 'server',
    get: function get() {
      if (typeof this._server === 'undefined') {
        this._server = new _bag2.default({
          host: null,
          port: null,
          path: '',
          method: null,
          address: null,
          localAddress: null
        });
      }

      return this._server;
    },
    set: function set(server) {
      if ((typeof server === 'undefined' ? 'undefined' : _typeof(server)) === 'object') {
        this.server.replace(server);
      } else {
        throw new Error('[Request::server] Input server must be an JSON object.');
      }
    }
  }, {
    key: 'client',
    get: function get() {
      if (typeof this._client === 'undefined') {
        this._client = new _bag2.default({
          address: null,
          port: null
        });
      }

      return this._client;
    },
    set: function set(client) {
      if ((typeof client === 'undefined' ? 'undefined' : _typeof(client)) === 'object') {
        this.client.replace(client);
      } else {
        throw new Error('[Request::client] Input client must be an JSON object.');
      }
    }
  }, {
    key: 'host',
    get: function get() {
      return this.server.get(REQUEST_HOST);
    },
    set: function set(host) {
      this.server.set(REQUEST_HOST, host);
    }
  }, {
    key: 'port',
    get: function get() {
      return this.server.get(REQUEST_PORT);
    },
    set: function set(port) {
      this.server.set(REQUEST_PORT, port);
    }
  }, {
    key: 'path',
    get: function get() {
      return this.server.get(REQUEST_PATH, '');
    },
    set: function set(path) {
      this.server.set(REQUEST_PATH, path);
    }
  }, {
    key: 'method',
    get: function get() {
      return this.server.get(REQUEST_METHOD, Request.METHOD_GET);
    },
    set: function set(method) {
      this.server.set(REQUEST_METHOD, method);
    }
  }, {
    key: 'query',
    get: function get() {
      if (typeof this._query === 'undefined') {
        this._query = new _bag2.default();
      }

      return this._query;
    },
    set: function set(query) {
      if (typeof query === 'string') {
        this._query = new _bag2.default(parseQueryString(query));
      } else if ((typeof query === 'undefined' ? 'undefined' : _typeof(query)) === 'object') {
        if (query instanceof _bag2.default) {
          this._query = query;
        } else {
          this._query = new _bag2.default(query);
        }
      }
    }
  }, {
    key: 'params',
    get: function get() {
      if (typeof this._params === 'undefined') {
        this._params = new _bag2.default();
      }

      return this._params;
    },
    set: function set(params) {
      this.params.replace(params);
    }
  }, {
    key: 'serverAddress',
    get: function get() {
      return this.server.get(REQUEST_ADDRESS);
    }
  }, {
    key: 'localAddress',
    get: function get() {
      return this.server.get(REQUEST_LOCAL_ADDRESS);
    }
  }, {
    key: 'clientAddress',
    get: function get() {
      return this.client.get(REQUEST_CLIENT_ADDRESS);
    }
  }, {
    key: 'clientPort',
    get: function get() {
      return this.client.get(REQUEST_CLIENT_PORT);
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