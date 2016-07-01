'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Bag = function () {
  function Bag(data) {
    (0, _classCallCheck3.default)(this, Bag);

    this.replace(data);
  }

  (0, _createClass3.default)(Bag, [{
    key: 'replace',
    value: function replace() {
      var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      this.data = (0, _assign2.default)({}, data);
    }
  }, {
    key: 'has',
    value: function has(key) {
      return typeof this.data[key] !== 'undefined';
    }
  }, {
    key: 'get',
    value: function get(key) {
      var def = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      return this.has(key) ? this.data[key] : def;
    }
  }, {
    key: 'set',
    value: function set(key, value) {
      this.data[key] = value;
    }
  }, {
    key: 'remove',
    value: function remove(key) {
      delete this.data[key];
    }
  }, {
    key: 'all',
    value: function all() {
      return this.data;
    }
  }, {
    key: 'only',
    value: function only(keys) {
      var _this = this;

      var values = {};
      keys.forEach(function (key) {
        values[key] = _this.get(key);
      });
      return values;
    }
  }, {
    key: 'clean',
    value: function clean() {
      this.data = {};
    }
  }]);
  return Bag;
}();

exports.default = Bag;