'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Message = exports.Body = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _header = require('./header');

var _header2 = _interopRequireDefault(_header);

var _bag = require('../bag');

var _bag2 = _interopRequireDefault(_bag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Body of message
 */
var Body = exports.Body = function () {
  /**
   * Constructor
   * @param {?string} content Content of message's body
   * @param {?string} [type="application/json"] Body's content type
   */
  function Body(content) {
    var type = arguments.length <= 1 || arguments[1] === undefined ? Message.CONTENT_JSON : arguments[1];

    _classCallCheck(this, Body);

    /**
     * @type {*}
     */
    this.content = content;

    /**
     * @type {string}
     */
    this.type = type;

    /**
     * Raw content of body
     * @access protected
     * @type {string}
     */
    this.rawContent = '';

    /**
     * Parsed content of body
     * @access protected
     * @type {object|Bag}
     */
    this.parsedContent = {};
  }

  /**
   * Return body as a string
   * @returns {string}
   */


  _createClass(Body, [{
    key: 'toString',
    value: function toString() {
      return this.rawContent;
    }

    /**
     * @type {object}
     */

  }, {
    key: 'handleContentJson',


    /**
     * Handle JSON Content
     * @access protected
     * @param {*} content Body content
     */
    value: function handleContentJson(content) {
      var contentType = typeof content === 'undefined' ? 'undefined' : _typeof(content);
      switch (contentType) {
        case 'object':
          this.parsedContent = new _bag2.default(content);
          this.rawContent = JSON.stringify(content);
          break;
        case 'string':
          if (content === '') {
            this.parsedContent = new _bag2.default();
          } else {
            this.parsedContent = new _bag2.default(JSON.parse(content));
          }
          this.rawContent = content;
          break;
        case 'function':
          this.handleContentJson(content());
          break;
        default:
          break;
      }
    }
  }, {
    key: 'content',
    get: function get() {
      return this.parsedContent;
    }

    /**
     * @param {*} content Content of body to be set
     */
    ,
    set: function set(content) {
      if (typeof content === 'undefined') {
        return;
      }

      switch (this.type) {
        case Message.CONTENT_JSON:
          this.handleContentJson(content);
          break;
        default:
          throw new Error('Invalid Body Content Type');
          break;
      }
    }
  }]);

  return Body;
}();

/**
 * Http Message
 */


var Message = exports.Message = function () {
  /**
   * Constructor
   * @param {?{}} headers Message's headers
   * @param {?*} body Message's body
   */
  function Message(headers, body) {
    _classCallCheck(this, Message);

    /**
     * @type {Header}
     */
    this.headers = headers;

    /**
     * @type {Body}
     */
    this.body = body;

    /**
     * Original resource
     * @access protected
     * @type {object}
     */
    this.resource = null;
  }

  /**
   * @type {string}
   */


  _createClass(Message, [{
    key: 'on',


    /**
     * Add an event listener to original resource object
     * @param {!string} event Name of the event
     * @param {!function} callback Callback function to the event
     */
    value: function on(event, callback) {
      if (this.resource !== null) {
        this.resource.on(event, callback);
      }
    }
  }, {
    key: 'type',
    get: function get() {
      return this.headers.get(Message.HEADER_CONTENT_TYPE, Message.CONTENT_JSON);
    }

    /**
     * @type {Header}
     */

  }, {
    key: 'headers',
    get: function get() {
      return this._headers;
    }

    /**
     * @param {{}} headers
     */
    ,
    set: function set(headers) {
      if (typeof headers === 'undefined') {
        headers = {};
      }
      if ((typeof headers === 'undefined' ? 'undefined' : _typeof(headers)) === 'object' && headers instanceof _bag2.default) {
        headers = headers.all();
      }

      this._headers = new _header2.default(headers);
    }

    /**
     * @type {Body}
     */

  }, {
    key: 'body',
    get: function get() {
      return this._body;
    }

    /**
     * @param {?*} body
     */
    ,
    set: function set(body) {
      if (typeof body === 'undefined') {
        return;
      }

      this._body = body;
    }
  }]);

  return Message;
}();

Message.HEADER_CONTENT_TYPE = 'Content-Type';
Message.HEADER_USER_AGENT = 'User-Agent';
Message.HEADER_HOST = 'Host';

Message.CONTENT_XML = 'text/xml';
Message.CONTENT_HTML = 'text/html';
Message.CONTENT_TEXT = 'text/plain';
Message.CONTENT_JSON = 'application/json';