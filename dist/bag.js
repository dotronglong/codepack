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
    key: 'size',
    value: function size() {
      return this.length;
    }
  }, {
    key: 'replace',
    value: function replace() {
      var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      this.data = Object.assign({}, data);
    }
  }, {
    key: 'has',
    value: function has(key) {
      return !(typeof this.data[key] === 'undefined');
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
    key: 'delete',
    value: function _delete(key) {
      delete this.data[key];
    }
  }, {
    key: 'forEach',
    value: function forEach(callback, target) {
      var _this = this;

      this.keys.forEach(function (key) {
        if (typeof target === 'undefined') {
          callback(key, _this.data[key]);
        } else {
          callback.apply(target, [key, _this.data[key]]);
        }
      });
    }
  }, {
    key: 'all',
    value: function all() {
      return this.data;
    }
  }, {
    key: 'only',
    value: function only(keys) {
      var _this2 = this;

      var values = {};
      keys.forEach(function (key) {
        values[key] = _this2.get(key);
      });
      return values;
    }
  }, {
    key: 'clean',
    value: function clean() {
      this.data = {};
    }
  }, {
    key: 'toString',
    value: function toString() {
      var keys = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
      var delimiter = arguments.length <= 1 || arguments[1] === undefined ? '&' : arguments[1];

      var data = this.data;
      if (Array.isArray(keys)) {
        data = this.only(keys);
      }

      var string = '';
      Object.keys(data).forEach(function (k) {
        string += (string === '' ? '' : delimiter) + (k + '=' + data[k]);
      });
      return string;
    }
  }, {
    key: Symbol.iterator,
    value: function value() {
      var size = this.size(),
          keys = this.keys,
          values = this.values;
      var position = 0;

      return {
        next: function next() {
          return position < size ? { value: [keys[position], values[position++]], done: false } : { done: true };
        }
      };
    }
  }, {
    key: 'length',
    get: function get() {
      return this.keys.length;
    }
  }, {
    key: 'keys',
    get: function get() {
      return Object.keys(this.data);
    }
  }, {
    key: 'values',
    get: function get() {
      var _this3 = this;

      var values = [];
      this.keys.forEach(function (key) {
        return values.push(_this3.data[key]);
      });
      return values;
    }
  }]);

  return Bag;
}();

exports.default = Bag;