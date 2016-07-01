'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bag = function () {
  function Bag(data) {
    _classCallCheck(this, Bag);

    this.replace(data);
  }

  _createClass(Bag, [{
    key: 'replace',
    value: function replace() {
      var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      this.data = Object.assign({}, data);
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