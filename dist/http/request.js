'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _message = require('./message');

var _message2 = _interopRequireDefault(_message);

var _bag = require('../bag');

var _bag2 = _interopRequireDefault(_bag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Request = function (_Message) {
  _inherits(Request, _Message);

  function Request(method, uri, query, params, body, headers) {
    _classCallCheck(this, Request);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Request).call(this, body, headers));

    _this.method = method;
    _this.uri = uri;
    _this.query = new _bag2.default(query);
    _this.params = new _bag2.default(params);
    return _this;
  }

  return Request;
}(_message2.default);

exports.default = Request;