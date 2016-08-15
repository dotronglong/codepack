'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function copy() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return Object.assign.apply(Object, [{}].concat(args));
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

/**
 * An alternative for Map to handle key-value data
 */

var Bag = function () {
  /**
   * @param {?{}} [data={}] Initial object data
   */
  function Bag() {
    var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Bag);

    this.replace(data);
    iterator.apply(this);
  }

  /**
   * Return size (total items)
   * @returns {number}
   */


  _createClass(Bag, [{
    key: 'size',
    value: function size() {
      return this.length;
    }

    /**
     * Return total items
     * @returns {number}
     */

  }, {
    key: 'replace',


    /**
     * Replace the current data with new one
     * @param {?{}} [data={}] Data to replace
     */
    value: function replace() {
      var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      this._data = copy(data);
    }

    /**
     * Determine whether or not a key exists in Bag
     * @param {!string} key
     * @returns {boolean}
     */

  }, {
    key: 'has',
    value: function has(key) {
      return !(typeof this._data[key] === 'undefined');
    }

    /**
     * Get value of a pre-defined key
     * @param {!string} key
     * @param {?*} [def=null] Default value to return if key does not exist
     * @returns {*}
     */

  }, {
    key: 'get',
    value: function get(key) {
      var def = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      return this.has(key) ? this._data[key] : def;
    }

    /**
     * Set a key-value pair
     * @param {!string} key
     * @param {!*} value
     */

  }, {
    key: 'set',
    value: function set(key, value) {
      this._data[key] = value;
    }

    /**
     * Remove a value by key
     * @param {!string} key
     */

  }, {
    key: 'delete',
    value: function _delete(key) {
      delete this._data[key];
    }

    /**
     * Return a cloned version of Bag data
     * @returns {{}}
     */

  }, {
    key: 'all',
    value: function all() {
      return copy(this._data);
    }

    /**
     * Get key-value pairs only for proposed keys
     * @param {!Array} keys An array of keys to get their's values
     * @returns {{}}
     */

  }, {
    key: 'only',
    value: function only(keys) {
      var _this = this;

      var items = {};
      keys.forEach(function (key) {
        return items[key] = _this._data[key];
      });
      return items;
    }

    /**
     * Clear all data
     */

  }, {
    key: 'clear',
    value: function clear() {
      this._data = {};
    }

    /**
     * Combine all key-value pairs into string with a proposed delimiter
     * @param {?Array} [keys=null] (Optional) only render key-value pairs which has key in this pre-defined keys
     * @param {?string} [delimiter='&'] Conjunction of string to connect key-value pairs
     * @returns {string}
     */

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
        data = copy(this._data);
      }

      Object.keys(data).forEach(function (key) {
        string += (string === '' ? '' : delimiter) + (key + '=' + data[key]);
      });
      return string;
    }

    /**
     * Loop through data with a callback
     * @param {function} callback A callback function to handle item,
     *                            it would receive 2 parameters (key, value) as the input
     * @param {?Object} target An object to become "this argument" (receiver) of the callback
     */

  }, {
    key: 'forEach',
    value: function forEach(callback, target) {
      var _this2 = this;

      this.keys.forEach(function (key) {
        if (typeof target === 'undefined') {
          callback(key, _this2._data[key]);
        } else {
          callback.apply(target, [key, _this2._data[key]]);
        }
      });
    }

    /**
     * Return an iterator to be looped through data of Bag
     * @param {?Array} keys (Optional) Only allow to loop pre-defined keys
     * @returns {function} Iterator function to be used as for..of
     */

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

    /**
     * Return all keys in Bag
     * @returns {Array}
     */

  }, {
    key: 'keys',
    get: function get() {
      return keys(this._data);
    }

    /**
     * Return all values in Bag
     * @returns {Array}
     */

  }, {
    key: 'values',
    get: function get() {
      return values(this._data);
    }
  }]);

  return Bag;
}();

exports.default = Bag;