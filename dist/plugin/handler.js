"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _request = require("../http/request");

var _request2 = _interopRequireDefault(_request);

var _response = require("../http/response");

var _response2 = _interopRequireDefault(_response);

var _connection = require("../http/connection");

var _connection2 = _interopRequireDefault(_connection);

var _app = require("../app");

var _app2 = _interopRequireDefault(_app);

var _request3 = require("../http/event/request");

var _request4 = _interopRequireDefault(_request3);

var _listener = require("../event/listener");

var _listener2 = _interopRequireDefault(_listener);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RequestLitener = function RequestLitener() {
  _classCallCheck(this, RequestLitener);
};

var HandlerPlugin = function (_App$Plugin) {
  _inherits(HandlerPlugin, _App$Plugin);

  function HandlerPlugin() {
    _classCallCheck(this, HandlerPlugin);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(HandlerPlugin).apply(this, arguments));
  }

  _createClass(HandlerPlugin, [{
    key: "onBoot",
    value: function onBoot() {
      this.app.events.sub;
    }
  }]);

  return HandlerPlugin;
}(_app2.default.Plugin);

exports.default = HandlerPlugin;