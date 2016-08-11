'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function copy() {
  return Object.assign.apply(Object, arguments);
}

function keys(source) {
  return Object.keys(source);
}

function values(source) {
  var values = [];
  keys(source).forEach(function (key) {
    return values.push(source[key]);
  });
  return values;
}

function iterator() {
  var _keys = void 0,
      _values = void 0;
  if (this instanceof Bag) {
    _keys = this.keys, _values = this.values;
  } else {
    _keys = keys(this), _values = values(this);
  }
  this[Symbol.iterator] = function () {
    return loop(_keys, _values);
  };
  return this;
}

function loop(keys, values) {
  var length = keys.length;
  var position = 0;

  return {
    next: function next() {
      return position < length ? {
        value: [keys[position], values[position++]],
        done: false
      } : { done: true };
    }
  };
}

var Bag = function () {
  function Bag(data) {
    _classCallCheck(this, Bag);

    this.replace(data);
    iterator.apply(this);
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

      this.data = copy({}, data);
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
    key: 'all',
    value: function all() {
      return this.data;
    }
  }, {
    key: 'only',
    value: function only(keys) {
      var _this = this;

      var items = {};
      keys.forEach(function (key) {
        return items[key] = _this.data[key];
      });
      return items;
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.data = {};
    }
  }, {
    key: 'toString',
    value: function toString() {
      var keys = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
      var delimiter = arguments.length <= 1 || arguments[1] === undefined ? '&' : arguments[1];

      var data = [],
          string = '';

      if (Array.isArray(keys)) {
        data = this.only(keys);
      } else {
        data = copy({}, this.data);
      }

      Object.keys(data).forEach(function (k) {
        string += (string === '' ? '' : delimiter) + (k + '=' + data[k]);
      });
      return string;
    }
  }, {
    key: 'forEach',
    value: function forEach(callback, target) {
      var _this2 = this;

      this.keys.forEach(function (key) {
        if (typeof target === 'undefined') {
          callback(key, _this2.data[key]);
        } else {
          callback.apply(target, [key, _this2.data[key]]);
        }
      });
    }
  }, {
    key: 'entries',
    value: function entries(keys) {
      return iterator.apply(typeof keys === 'undefined' ? this : this.only(keys));
    }
  }, {
    key: 'length',
    get: function get() {
      return this.keys.length;
    }
  }, {
    key: 'keys',
    get: function get() {
      return keys(this.data);
    }
  }, {
    key: 'values',
    get: function get() {
      return values(this.data);
    }
  }]);

  return Bag;
}();

exports.default = Bag;