'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _body = require('./body');

var _body2 = _interopRequireDefault(_body);

var _header = require('./header');

var _header2 = _interopRequireDefault(_header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * HTTP Message
 */
var Message = function () {
  /**
   * Constructor
   */
  function Message() {
    _classCallCheck(this, Message);

    this.setBody(new _body2.default());
    this.setHeader(new _header2.default());
  }

  /**
   * Get message's body
   * @returns {Body}
   */


  _createClass(Message, [{
    key: 'getBody',
    value: function getBody() {
      return this._body;
    }

    /**
     * Set message's body
     * @param {Body} body
     */

  }, {
    key: 'setBody',
    value: function setBody(body) {
      if (body instanceof _body2.default) {
        this._body = body;
      } else {
        throw new Error('The message\'s body must be either an instance of Body.');
      }
    }

    /**
     * Get message's header
     * @returns {Header}
     */

  }, {
    key: 'getHeader',
    value: function getHeader() {
      return this._header;
    }

    /**
     * Set message's header
     * @param {Bag|Object} header
     */

  }, {
    key: 'setHeader',
    value: function setHeader(header) {
      if (header instanceof _header2.default) {
        this._header = header;
      } else if ((typeof header === 'undefined' ? 'undefined' : _typeof(header)) === 'object') {
        this._header = new _header2.default(header);
      } else {
        throw new Error('The message\'s header must be an instance of Header or an object.');
      }
    }

    /**
     * Get original resource
     * @returns {*}
     */

  }, {
    key: 'getResource',
    value: function getResource() {
      return this._resource;
    }

    /**
     * Set original resource
     * @param {*} resource
     */

  }, {
    key: 'setResource',
    value: function setResource(resource) {
      this._resource = resource;
    }
  }]);

  return Message;
}();

exports.default = Message;