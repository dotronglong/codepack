"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _before_send = require("./event/response/before_send");

var _before_send2 = _interopRequireDefault(_before_send);

var _after_send = require("./event/response/after_send");

var _after_send2 = _interopRequireDefault(_after_send);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Connect handler
 */

var Handler = function () {
  /**
   * Constructor
   * @param {!EventManager} events Event manager which should be passed from {App}
   * @param {!Connection} connection Current active connection
   */

  function Handler(events, connection) {
    _classCallCheck(this, Handler);

    /**
     * Event manager
     * @access protected
     * @type {EventManager}
     */
    this.events = events;

    /**
     * Current active connection
     * @access protected
     * @type {Connection}
     */
    this.connnection = connection;
  }

  /**
   * Get current request from connection
   * @return {Request}
   */


  _createClass(Handler, [{
    key: "reply",


    /**
     * Send response out to client
     */
    value: function reply() {
      this.events.emit(new _before_send2.default(this.connnection));
      this.response.send();
      this.events.emit(new _after_send2.default(this.connnection));
    }
  }, {
    key: "request",
    get: function get() {
      return this.connection.request;
    }

    /**
     * Get current response from connection
     * @return {Response}
     */

  }, {
    key: "response",
    get: function get() {
      return this.connection.response;
    }

    /**
     * Get current processing server
     * @return {Server}
     */

  }, {
    key: "server",
    get: function get() {
      return this.connection.server;
    }
  }]);

  return Handler;
}();

exports.default = Handler;