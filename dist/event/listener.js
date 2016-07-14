"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LIMIT_NONE = null;
var LIMIT_ONCE = 1;
var LIMIT_TWICE = 2;

var PRIORITY_LOW = 1;
var PRIORITY_NORMAL = 5;
var PRIORITY_HIGH = 10;

var Listener = function () {
  function Listener(runner) {
    var priority = arguments.length <= 1 || arguments[1] === undefined ? PRIORITY_NORMAL : arguments[1];
    var limit = arguments.length <= 2 || arguments[2] === undefined ? LIMIT_NONE : arguments[2];

    _classCallCheck(this, Listener);

    this.runner = runner;
    this.priority = priority;
    this.limit = limit;
  }

  _createClass(Listener, [{
    key: "done",
    value: function done(callback) {
      this.cbDone = callback;
      return this;
    }
  }, {
    key: "error",
    value: function error(callback) {
      this.cbError = callback;
      return this;
    }
  }]);

  return Listener;
}();

exports.default = Listener;

Listener.LIMIT_NONE = LIMIT_NONE;
Listener.LIMIT_ONCE = LIMIT_ONCE;
Listener.LIMIT_TWICE = LIMIT_TWICE;

Listener.PRIORITY_LOW = PRIORITY_LOW;
Listener.PRIORITY_NORMAL = PRIORITY_NORMAL;
Listener.PRIORITY_HIGH = PRIORITY_HIGH;