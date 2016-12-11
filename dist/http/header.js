'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _bag = require('../bag');

var _bag2 = _interopRequireDefault(_bag);

var _str = require('../str');

var _str2 = _interopRequireDefault(_str);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Contain headers as a bag, easy to manipulate
 */
var Header = function (_Bag) {
  _inherits(Header, _Bag);

  function Header() {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
  }

  _createClass(Header, [{
    key: 'has',


    /**
     * Define whether or not a header key exist
     * @param {!string} key A string represents for header name, it is case-insensitive
     * @returns {boolean}
     */
    value: function has(key) {
      return _get(Header.prototype.__proto__ || Object.getPrototypeOf(Header.prototype), 'has', this).call(this, key.toLowerCase());
    }

    /**
     * Get value of a header by key
     * @param {!string} key Name of header to retrieve
     * @param {?string} [def=null] Default value to return in case there is no headers valid
     * @returns {string}
     */

  }, {
    key: 'get',
    value: function get(key) {
      var def = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      return _get(Header.prototype.__proto__ || Object.getPrototypeOf(Header.prototype), 'get', this).call(this, key.toLowerCase(), def);
    }

    /**
     * Set a header (key-value)
     * @param {!string} key
     * @param {!string} value
     */

  }, {
    key: 'set',
    value: function set(key, value) {
      _get(Header.prototype.__proto__ || Object.getPrototypeOf(Header.prototype), 'set', this).call(this, key.toLowerCase(), value);
    }

    /**
     * Remove a header by key
     * @param {!string} key
     */

  }, {
    key: 'delete',
    value: function _delete(key) {
      _get(Header.prototype.__proto__ || Object.getPrototypeOf(Header.prototype), 'delete', this).call(this, key.toLowerCase());
    }

    /**
     * Replace current headers with new ones
     * @param {?{}} [data={}]
     */

  }, {
    key: 'replace',
    value: function replace() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var _data = {};
      Object.keys(data).forEach(function (key) {
        _data[key.toLowerCase()] = data[key];
      });
      _get(Header.prototype.__proto__ || Object.getPrototypeOf(Header.prototype), 'replace', this).call(this, _data);
    }
  }, {
    key: 'keys',

    /**
     * Return all keys
     * @returns {Array}
     */
    get: function get() {
      var keys = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Object.keys(this._data)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;

          keys.push(_str2.default.upperCaseFirst(key, '-'));
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return keys;
    }
  }]);

  return Header;
}(_bag2.default);

exports.default = Header;

Header.CONTENT_TYPE = 'Content-Type';
Header.USER_AGENT = 'User-Agent';
Header.HOST = 'Host';