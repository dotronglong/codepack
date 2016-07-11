'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bag = require('../bag');

var _bag2 = _interopRequireDefault(_bag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Message = function () {
  function Message() {
    var content = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
    var headers = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, Message);

    this.content = content;
    this.headers = new _bag2.default(headers);
    this.resource = null;
  }

  _createClass(Message, [{
    key: 'getContent',
    value: function getContent() {
      var content = this.content;
      var contentType = this.headers.get(Message.HEADER_CONTENT_TYPE, Message.CONTENT_JSON);
      switch (contentType) {
        case Message.CONTENT_JSON:
          content = JSON.parse(content);
          break;

        default:
          break;
      }

      return content;
    }
  }, {
    key: 'from',
    value: function from(resource) {
      throw new Error('This method must be overridden');
    }
  }]);

  return Message;
}();

exports.default = Message;

Message.HEADER_CONTENT_TYPE = 'content-type';
Message.HEADER_USER_AGENT = 'user-agent';
Message.HEADER_HOST = 'host';

Message.CONTENT_XML = 'text/xml';
Message.CONTENT_HTML = 'text/html';
Message.CONTENT_TEXT = 'text/plain';
Message.CONTENT_JSON = 'application/json';