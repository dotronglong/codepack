'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _message = require('./message');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Http Response
 */
var Response = function (_Message) {
  _inherits(Response, _Message);

  /**
   * Constructor
   * @param {?Object} [headers={}] Initial headers
   * @param {?string} [body=''] Response's body content
   * @param {?number} [statusCode=200] Response's status code, default is OK
   */
  function Response() {
    var headers = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var body = arguments[1];
    var statusCode = arguments.length <= 2 || arguments[2] === undefined ? Response.HTTP_OK : arguments[2];

    _classCallCheck(this, Response);

    /**
     * Response's status code
     * @type {number}
     */
    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Response).call(this, headers, body));

    _this.statusCode = statusCode;

    /**
     * Response's status message
     * @type {string}
     */
    _this.statusMessage = null;
    return _this;
  }

  /**
   * Send response to client
   */


  _createClass(Response, [{
    key: 'send',
    value: function send() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.headers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _slicedToArray(_step.value, 2);

          var key = _step$value[0];
          var value = _step$value[1];

          this.resource.setHeader(key, value);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.resource.statusCode = this.statusCode;
      this.resource.end(this.body.toString());
    }
  }]);

  return Response;
}(_message.Message);

exports.default = Response;

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