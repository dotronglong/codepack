'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bag = require('../bag');

var _bag2 = _interopRequireDefault(_bag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * HTTP Body
 */
var Body = function () {
  /**
   * Constructor
   * @param {?string} [content=''] Content of message's body
   * @param {?string} [contentType='application/json'] Body's content type
   */
  function Body(content, contentType) {
    _classCallCheck(this, Body);

    this.setContent(content);
    this.setContentType(contentType);
  }

  /**
   * Return body as a string
   * @returns {string}
   */


  _createClass(Body, [{
    key: 'toString',
    value: function toString() {
      return this.getContent();
    }

    /**
     * Body's content
     * @returns {string}
     */

  }, {
    key: 'getContent',
    value: function getContent() {
      return this._content;
    }

    /**
     * Set body's content
     * @param {string} content
     */

  }, {
    key: 'setContent',
    value: function setContent() {
      var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      this._content = content;
      this._parsedContent = null;
    }

    /**
     * Get parsed content
     * @returns {*|null}
     */

  }, {
    key: 'getParsedContent',
    value: function getParsedContent() {
      if (this._parsedContent === null) {
        this._parsedContent = this._parseContent(this.getContent(), this.getContentType());
      }

      return this._parsedContent;
    }

    /**
     * Set parsed content
     * @param {*} parsedContent
     */

  }, {
    key: 'setParsedContent',
    value: function setParsedContent(parsedContent) {
      this._parsedContent = parsedContent;
    }

    /**
     * Get Body's content type
     * @returns {string}
     */

  }, {
    key: 'getContentType',
    value: function getContentType() {
      return this._contentType;
    }

    /**
     * Set Body's content type
     * @param {string} contentType Default is JSON
     */

  }, {
    key: 'setContentType',
    value: function setContentType() {
      var contentType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Body.DEFAULT_TYPE;

      this._contentType = contentType;
    }

    /**
     * Parse content by content's type
     * @param {*} content
     * @param {string} contentType
     * @returns {*}
     * @private
     */

  }, {
    key: '_parseContent',
    value: function _parseContent(content, contentType) {
      var parsedContent = void 0;
      switch (contentType) {
        case Body.CONTENT_JSON:
          parsedContent = this._parseContentJSON(content);
          break;
        default:
          throw new Error('The body content\'s type is not supported.');
          break;
      }

      return parsedContent;
    }

    /**
     * Parse JSON Content
     * @param {*} content The JSON content
     * @returns {Bag}
     * @private
     */

  }, {
    key: '_parseContentJSON',
    value: function _parseContentJSON(content) {
      if (content === '') {
        return new _bag2.default();
      } else {
        return new _bag2.default(JSON.parse(content));
      }
    }
  }]);

  return Body;
}();

exports.default = Body;


Body.CONTENT_XML = 'text/xml';
Body.CONTENT_HTML = 'text/html';
Body.CONTENT_TEXT = 'text/plain';
Body.CONTENT_JSON = 'application/json';
Body.DEFAULT_TYPE = Body.CONTENT_JSON;