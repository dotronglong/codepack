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

var _request3 = require("../http/event/request");

var _request4 = _interopRequireDefault(_request3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HEADER_HOST = "host";

var KernelPlugin = function (_Plugin) {
  _inherits(KernelPlugin, _Plugin);

  function KernelPlugin() {
    _classCallCheck(this, KernelPlugin);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(KernelPlugin).apply(this, arguments));
  }

  _createClass(KernelPlugin, [{
    key: "onBoot",
    value: function onBoot() {
      var _this2 = this;

      this.app.servers.forEach(function (server) {
        return _this2.setUpServer(server);
      });
    }

    /**
     * Set up the server, connection and finally emit RequestEvent
     * @param {Server} server
     */

  }, {
    key: "setUpServer",
    value: function setUpServer(server) {
      var _this3 = this;

      server.kernel.on("request", function (req, res) {
        var connection = _this3.setUpConnection(req, res, server);
        _this3.app.events.emit(new _request4.default(connection));
      });
    }
  }, {
    key: "setUpRequest",
    value: function setUpRequest(resource) {
      var request = new _request2.default();
      request.resource = resource;
      request.headers = resource.headers;
      request.method = resource.method;
      request.path = resource.url;

      var host = request.headers.get(HEADER_HOST);
      var matches = host.match(/^([\w\.-]+):?(\d+)?$/i);
      if (matches !== null) {
        request.host = matches[1];
        if (matches[2] !== undefined) {
          request.port = matches[2];
        }
      }

      return request;
    }
  }, {
    key: "setUpResponse",
    value: function setUpResponse(res) {
      var response = new _response2.default();
      response.resource = res;
      return response;
    }
  }, {
    key: "setUpConnection",
    value: function setUpConnection(req, res, server) {
      var request = this.setUpRequest(req),
          response = this.setUpResponse(res);
      return new _connection2.default(request, response, server);
    }
  }]);

  return KernelPlugin;
}(_app.Plugin);

exports.default = KernelPlugin;