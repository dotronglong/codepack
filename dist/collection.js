'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var assert = require('assert');

var Collection = function () {
  function Collection() {
    var items = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

    _classCallCheck(this, Collection);

    this.items = items;
  }

  _createClass(Collection, [{
    key: 'add',
    value: function add(item) {
      this.item.push(item);
    }
  }, {
    key: 'remove',
    value: function remove(item) {
      switch (typeof item === 'undefined' ? 'undefined' : _typeof(item)) {
        case 'number':
          this.item.splice(item, 1);
          break;

        case 'object':
        default:
          try {} catch (e) {}
          break;
      }
    }
  }]);

  return Collection;
}();

exports.default = Collection;