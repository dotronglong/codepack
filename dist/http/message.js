'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bag = require('../bag');

var _bag2 = _interopRequireDefault(_bag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TYPE_OBJECT = 'object';
var TYPE_FUNCTION = 'function';
var TYPE_STRING = 'string';

var Body = function () {
  function Body() {
    var content = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
    var type = arguments[1];

    _classCallCheck(this, Body);

    this.type = type;
    this.content = content;
  }

  _createClass(Body, [{
    key: 'handleContentJson',
    value: function handleContentJson(content) {
      var contentType = typeof content === 'undefined' ? 'undefined' : _typeof(content);
      switch (contentType) {
        case TYPE_OBJECT:
          try {

            this.parsedContent = content;
            this.rawContent = JSON.stringify(content);
          } catch (e) {
            console.log(e);
          }
          break;
        case TYPE_STRING:
          if (content === '') {
            this.parsedContent = {};
          } else {
            this.parsedContent = JSON.parse(content);
          }
          this.rawContent = content;
          break;
        default:
          break;
      }
    }
  }, {
    key: 'toString',
    value: function toString() {
      return this.rawContent;
    }
  }, {
    key: 'content',
    get: function get() {
      return this.parsedContent;
    },
    set: function set(content) {
      switch (this.type) {
        case Message.CONTENT_JSON:
          this.handleContentJson(content);
          break;
      }
    }
  }]);

  return Body;
}();

var Message = function () {
  function Message() {
    var content = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
    var headers = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, Message);

    this.headers = headers;
    this.body = content;
    this.resource = null;
  }

  _createClass(Message, [{
    key: 'headers',
    get: function get() {
      return this._headers;
    },
    set: function set(headers) {
      this._headers = new _bag2.default(headers);
    }
  }, {
    key: 'body',
    get: function get() {
      return this._body;
    },
    set: function set(content) {
      if (content instanceof Body) {
        this._body = content;
      } else {
        this._body = new Body(content, this.headers.get(Message.HEADER_CONTENT_TYPE, Message.CONTENT_JSON));
      }
    }
  }]);

  return Message;
}();

exports.default = Message;

Message.HEADER_CONTENT_TYPE = 'Content-Type';
Message.HEADER_USER_AGENT = 'User-Agent';
Message.HEADER_HOST = 'Host';

Message.CONTENT_XML = 'text/xml';
Message.CONTENT_HTML = 'text/html';
Message.CONTENT_TEXT = 'text/plain';
Message.CONTENT_JSON = 'application/json';