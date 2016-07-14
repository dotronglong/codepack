'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _header = require('./header');

var _header2 = _interopRequireDefault(_header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Message = function () {
  function Message() {
    var headers = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Message);

    this.headers = headers;
    this.resource = null;
  }

  _createClass(Message, [{
    key: 'on',
    value: function on(event, callback) {
      if (this.resource !== null) {
        this.resource.on(event, callback);
      }
    }
  }, {
    key: 'headers',
    get: function get() {
      return this._headers;
    },
    set: function set(headers) {
      if (typeof headers === 'undefined') {
        headers = {};
      }

      this._headers = new _header2.default(headers);
      this.type = this.headers.get(Message.HEADER_CONTENT_TYPE, Message.CONTENT_JSON);
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