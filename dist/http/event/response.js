'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _event = require('../../event/event');

var _event2 = _interopRequireDefault(_event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResponseEvent = function (_Event) {
  _inherits(ResponseEvent, _Event);

  function ResponseEvent() {
    var response = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

    _classCallCheck(this, ResponseEvent);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ResponseEvent).call(this, 'http.outgoing_response', false));

    _this.response = response;
    return _this;
  }

  return ResponseEvent;
}(_event2.default);

exports.default = ResponseEvent;