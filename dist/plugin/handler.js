"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _app = require("../app");

var _request = require("../http/event/request");

var _request2 = _interopRequireDefault(_request);

var _listener = require("../event/listener");

var _listener2 = _interopRequireDefault(_listener);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RequestListener = function (_Listener) {
  _inherits(RequestListener, _Listener);

  function RequestListener() {
    _classCallCheck(this, RequestListener);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(RequestListener).call(this, function () {}, _listener2.default.PRIORITY_HIGH));
  }

  return RequestListener;
}(_listener2.default);

var HandlerPlugin = function (_Plugin) {
  _inherits(HandlerPlugin, _Plugin);

  function HandlerPlugin() {
    _classCallCheck(this, HandlerPlugin);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(HandlerPlugin).apply(this, arguments));
  }

  _createClass(HandlerPlugin, [{
    key: "onBoot",
    value: function onBoot() {
      this.app.events.subscribe(_request2.default.NAME, new RequestListener());
    }
  }]);

  return HandlerPlugin;
}(_app.Plugin);

exports.default = HandlerPlugin;