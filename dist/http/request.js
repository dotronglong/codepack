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

var url = require('url');

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

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Request).call(this));

    _this.server = {
      host: null,
      port: null,
      address: null,
      localAddress: null
    };
    _this.remote = {
      address: null,
      port: null
    };
    _this.method = Request.METHOD_GET;
    _this.path = '';
    _this.query = new _bag2.default();
    return _this;
  }

  _createClass(Request, [{
    key: 'query',
    get: function get() {
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