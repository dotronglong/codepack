'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _message = require('./message');

var _message2 = _interopRequireDefault(_message);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Response = function (_Message) {
  _inherits(Response, _Message);

  function Response(content) {
    var headers = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    var statusCode = arguments.length <= 2 || arguments[2] === undefined ? Response.HTTP_OK : arguments[2];

    _classCallCheck(this, Response);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Response).call(this, content, headers));

    _this.statusCode = statusCode;
    return _this;
  }

  _createClass(Response, [{
    key: 'type',
    value: function type(_type) {
      this.headers.set(Response.HEADER_CONTENT_TYPE, _type);
    }
  }, {
    key: 'send',
    value: function send(content) {
      var _this2 = this;

      if (typeof content !== 'undefined') {
        this.body.content = content;
      }

      var headers = this.headers.all();
      Object.keys(headers).forEach(function (key) {
        _this2.resource.setHeader(key, headers[key]);
      });

      this.resource.statusCode = this.statusCode;
      this.resource.end(this.body.toString(), 'utf-8');
    }
  }], [{
    key: 'from',
    value: function from(resource) {
      return new Promise(function (resolve, reject) {
        try {
          var response = new Response();
          response.resource = resource;
          response.type(Response.DEFAULT_CONTENT_TYPE);
          resolve(response);
        } catch (e) {
          reject(e);
        }
      });
    }
  }]);

  return Response;
}(_message2.default);

exports.default = Response;

Response.DEFAULT_CONTENT_TYPE = Response.CONTENT_JSON;
Response.HTTP_OK = 200;
Response.HTTP_CREATED = 201;
Response.HTTP_ACCEPTED = 202;
Response.HTTP_NO_CONTENT = 204;
Response.HTTP_RESET_CONTENT = 205;
Response.HTTP_MOVED_PERMANENTLY = 301;
Response.HTTP_FOUND = 302;
Response.HTTP_NOT_MODIFIED = 304;
Response.HTTP_BAD_REQUEST = 400;
Response.HTTP_UNAUTHORIZED = 401;
Response.HTTP_FORBIDDEN = 403;
Response.HTTP_NOT_FOUND = 404;
Response.HTTP_METHOD_NOT_ALLOWED = 404;
Response.HTTP_REQUEST_TIMEOUT = 408;
Response.HTTP_TOO_MANY_REQUESTS = 429;
Response.HTTP_INTERNAL_ERROR = 500;
Response.HTTP_NOT_IMPLEMENTED = 501;
Response.HTTP_BAD_GATEWAY = 502;
Response.HTTP_SERVICE_UNAVAILABLE = 503;
Response.HTTP_GATEWAY_TIMEOUT = 504;