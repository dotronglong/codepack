'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bag = require('../bag');

var _bag2 = _interopRequireDefault(_bag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var http = require('http');
var https = require('https');

var DEFAULT_HTTP_PORT = 80;
var DEFAULT_HTTPS_PORT = 443;

var Server = function () {
  function Server() {
    var port = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
    var host = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
    var backlog = arguments.length <= 2 || arguments[2] === undefined ? 511 : arguments[2];
    var callback = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

    _classCallCheck(this, Server);

    this.port = port;
    this.host = host;
    this.backlog = backlog;
    this.callback = callback;
    this.name = null;
  }

  _createClass(Server, [{
    key: 'is',
    value: function is(name) {
      return this.name === name;
    }
  }, {
    key: 'start',
    value: function start() {
      return this.server.listen(this.port, this.host, this.backlog, this.callback);
    }
  }, {
    key: 'close',
    value: function close() {
      this.server.close();
    }
  }, {
    key: 'server',
    get: function get() {
      throw new Error('Derived class must implement getter of server property.');
    },
    set: function set(server) {
      this._server = server;
    }
  }]);

  return Server;
}();

var Http = function (_Server) {
  _inherits(Http, _Server);

  function Http() {
    var port = arguments.length <= 0 || arguments[0] === undefined ? DEFAULT_HTTP_PORT : arguments[0];
    var host = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
    var backlog = arguments.length <= 2 || arguments[2] === undefined ? 511 : arguments[2];
    var callback = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

    _classCallCheck(this, Http);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Http).call(this, port, host, backlog, callback));
  }

  _createClass(Http, [{
    key: 'server',
    get: function get() {
      if (typeof this._server === 'undefined') {
        this._server = http.createServer();
      }

      return this._server;
    }
  }]);

  return Http;
}(Server);

var Https = function (_Server2) {
  _inherits(Https, _Server2);

  function Https() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var port = arguments.length <= 1 || arguments[1] === undefined ? DEFAULT_HTTPS_PORT : arguments[1];
    var host = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
    var backlog = arguments.length <= 3 || arguments[3] === undefined ? 511 : arguments[3];
    var callback = arguments.length <= 4 || arguments[4] === undefined ? null : arguments[4];

    _classCallCheck(this, Https);

    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Https).call(this, port, host, backlog, callback));

    _this2.options = new _bag2.default(options);
    return _this2;
  }

  _createClass(Https, [{
    key: 'server',
    get: function get() {
      return https.createServer(this.options.all());
    }
  }]);

  return Https;
}(Server);

exports.default = { Http: Http, Https: Https };