'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _message = require('./message');

var _message2 = _interopRequireDefault(_message);

var _bag = require('../bag');

var _bag2 = _interopRequireDefault(_bag);

var _uri = require('./uri');

var _uri2 = _interopRequireDefault(_uri);

var _cli = require('../cli');

var _cli2 = _interopRequireDefault(_cli);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Request = function (_Message) {
  _inherits(Request, _Message);

  function Request(method, uri, params, content, headers) {
    _classCallCheck(this, Request);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Request).call(this, content, headers));

    _this.method = method;
    _this.uri = uri;
    _this.params = new _bag2.default(params);
    return _this;
  }

  _createClass(Request, null, [{
    key: 'from',
    value: function from(resource) {
      return new Promise(function (resolve, reject) {
        try {
          (function () {
            var request = new Request();
            request.method = resource.method;
            request.uri = _uri2.default.from(_uri2.default.SCHEME_HTTP + '://' + resource.headers[_message2.default.HEADER_HOST] + resource.url);
            request.headers = resource.headers;

            var body = [];
            resource.on('error', function (e) {
              reject(e);
            }).on('data', function (chunk) {
              body.push(chunk);
            }).on('end', function () {
              request.body = Buffer.concat(body).toString();
              resolve(request);
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