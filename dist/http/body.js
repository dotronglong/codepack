'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Body = function () {
  function Body(content) {
    var type = arguments.length <= 1 || arguments[1] === undefined ? Message.CONTENT_JSON : arguments[1];

    _classCallCheck(this, Body);

    this.content = content;
    this.type = type;
  }

  _createClass(Body, [{
    key: 'toString',
    value: function toString() {
      return this.rawContent;
    }
  }, {
    key: 'handleContentJson',
    value: function handleContentJson(content) {
      var contentType = typeof content === 'undefined' ? 'undefined' : _typeof(content);
      switch (contentType) {
        case 'object':
          this.parsedContent = content;
          this.rawContent = JSON.stringify(content);
          break;
        case 'string':
          if (content === '') {
            this.parsedContent = {};
          } else {
            this.parsedContent = JSON.parse(content);
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
    },
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