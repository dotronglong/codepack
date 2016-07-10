'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Listener = function Listener(runner, priority) {
  _classCallCheck(this, Listener);

  this.runner = runner;
  this.priority = priority;
};

var EventManager = function () {
  function EventManager() {
    _classCallCheck(this, EventManager);

    this.listeners = {};
  }

  _createClass(EventManager, [{
    key: 'on',
    value: function on(name, runner) {
      var priority = arguments.length <= 2 || arguments[2] === undefined ? EventManager.PRIORITY_NORMAL : arguments[2];

      if (!this.has(name)) {
        this.listeners[name] = [];
      }

      var listener = new Listener(runner, priority);
      this.listeners[name].push(listener);
    }
  }, {
    key: 'off',
    value: function off(name, priority) {
      if (!this.has(name)) {
        return;
      }

      if (typeof priority === 'undefined') {
        this.listeners[name] = [];
      } else {
        var total = this.listeners[name].length;
        for (var i = 0; i < total; i++) {
          if (this.listeners[name][i].priority === priority) {
            this.listeners[name].splice(i, 1);
          }
        }
      }
    }
  }, {
    key: 'sort',
    value: function sort(name) {
      var type = arguments.length <= 1 || arguments[1] === undefined ? EventManager.SORT_ASCENDING : arguments[1];

      if (typeof this.listeners[name] === 'undefined') {
        return;
      }

      var total = this.listeners[name].length;
      var pos = void 0,
          guard = void 0,
          listener = void 0,
          temporary = void 0;
      for (var i = 0; i < total - 1; i++) {
        pos = i;
        for (var j = i + 1; j < total; j++) {
          guard = this.listeners[name][pos];
          listener = this.listeners[name][j];
          if (type === EventManager.SORT_ASCENDING && guard.priority > listener.priority || type === EventManager.SORT_DESCENDING && guard.priority < listener.priority) {
            pos = j;
          }
        }

        if (i !== pos) {
          temporary = this.listeners[name][i];
          this.listeners[name][i] = this.listeners[name][pos];
          this.listeners[name][pos] = temporary;
        }
      }
    }
  }, {
    key: 'has',
    value: function has(name) {
      return typeof this.listeners[name] !== 'undefined';
    }
  }, {
    key: 'get',
    value: function get(name) {
      return this.has(name) ? this.listeners[name] : [];
    }
  }, {
    key: 'fire',
    value: function fire(name) {
      this.sort(name);

      var listeners = this.get(name);
      var total = listeners.length;

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      for (var i = 0; i < total; i++) {
        var listener = listeners[i];
        var isContinue = listener.runner.apply(listener, args);
        if (isContinue === false) {
          break;
        }
      }
    }
  }, {
    key: 'emit',
    value: function emit(name) {
      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      this.fire.apply(this, [name].concat(args));
    }
  }]);

  return EventManager;
}();

exports.default = EventManager;

EventManager.SORT_ASCENDING = 'asc';
EventManager.SORT_DESCENDING = 'desc';
EventManager.PRIORITY_LEAST = 0;
EventManager.PRIORITY_NORMAL = 10;
EventManager.PRIORITY_HIGHER = 20;