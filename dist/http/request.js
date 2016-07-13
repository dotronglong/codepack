'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _message = require('./message');

var _message2 = _interopRequireDefault(_message);

var _uri = require('./uri');

var _uri2 = _interopRequireDefault(_uri);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Request = function (_Message) {
  _inherits(Request, _Message);

  function Request(method, uri) {
    _classCallCheck(this, Request);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Request).call(this));

    _this.method = typeof method === 'undefined' ? Request.METHOD_GET : method;
    _this.uri = typeof uri === 'undefined' ? null : uri;
    return _this;
  }

  _createClass(Request, [{
    key: 'query',
    get: function get() {
      return this.uri.query;
    },
    set: function set(query) {
      this.uri.query = query;
    }
  }], [{
    key: 'from',
    value: function from(resource) {
      return new Promise(function (resolve, reject) {
        try {
          (function () {
            var request = new Request();
            request.resource = resource;
            request.method = resource.method;
            request.uri = _uri2.default.from(_uri2.default.SCHEME_HTTP + '://' + resource.headers[_message2.default.HEADER_HOST] + resource.url);
            request.headers = resource.headers;

            var body = [];
            resource.on('error', function (e) {
              reject(e);
            }).on('data', function (chunk) {
              body.push(chunk);
            }).on('end', function () {
              try {
                request.body = Buffer.concat(body).toString();
                resolve(request);
              } catch (e) {
                reject(e);
              }
            });
          })();
        } catch (e) {
          reject(e);
        }
      });
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