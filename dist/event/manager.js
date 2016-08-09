'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _listener = require('./listener');

var _listener2 = _interopRequireDefault(_listener);

var _event = require('./event');

var _event2 = _interopRequireDefault(_event);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function onAsyncCompleted(event, err) {
  var listeners = this.events[event.name].listeners;
  var total = listeners.length;
  for (var i = 0; i < total; i++) {
    var listener = listeners[i];

    if (listener.limit !== _listener2.default.LIMIT_NONE) {
      // reduce listener limit
      this.events[event.name].listeners[i].limit--;
    }

    if (err === null && typeof listener.cbDone === 'function') {
      listener.cbDone(event);
    } else if (err !== null && typeof listener.cbError === 'function') {
      if (typeof err === 'string') {
        event.exception = new Error(err);
      } else {
        event.exception = err;
      }
      listener.cbError(event);
    }

    if (listener.limit === 0) {
      // remove this listener
      removeEventListener.apply(this, [event.name, i]);
    }
  }
}
var getEventItem = function getEventItem() {
  var listeners = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var sorted = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

  return {
    listeners: listeners,
    sorted: sorted
  };
};
function removeEventListener(name, position) {
  this.events[name].listeners.splice(position, 1);
}

var EventManager = function () {
  function EventManager() {
    _classCallCheck(this, EventManager);

    this.events = {};
  }

  /**
   * Subscribe a listener to Event Manager
   *
   * @param {string} name
   * @param {Listener} listener
   */


  _createClass(EventManager, [{
    key: 'subscribe',
    value: function subscribe(name, listener) {
      if (!(listener instanceof _listener2.default)) {
        throw new Error('[Event:subscribe] listener must be an instance of Event/Listener');
      }
      return this.on(name, listener.runner, listener.priority, listener.limit);
    }
  }, {
    key: 'unsubscribe',
    value: function unsubscribe(name, listener) {
      if (!(listener instanceof _listener2.default)) {
        throw new Error('[Event:subscribe] listener must be an instance of Event/Listener');
      }
      return this.off(name, listener.priority);
    }

    /**
     * Bind a listener to event by name
     *
     * @param {string} name
     * @param {function|callable} runner
     * @param {int} priority
     * @returns {Listener}
     */

  }, {
    key: 'on',
    value: function on(name, runner, priority, limit) {
      if (!this.has(name)) {
        this.events[name] = getEventItem();
      }

      var listener = new _listener2.default(runner, priority, limit);
      this.events[name].listeners.push(listener);

      return listener;
    }
  }, {
    key: 'once',
    value: function once(name, runner, priority) {
      return this.on(name, runner, priority, _listener2.default.LIMIT_ONCE);
    }
  }, {
    key: 'twice',
    value: function twice(name, runner, priority) {
      return this.on(name, runner, priority, _listener2.default.LIMIT_TWICE);
    }
  }, {
    key: 'off',
    value: function off(name, priority) {
      if (typeof priority === 'undefined') {
        // remove all listeners of event's name
        this.events[name] = getEventItem();
      } else if (this.has(name)) {
        var listeners = this.get(name).listeners;
        for (var i = 0; i < listeners.length; i++) {
          var listener = listeners[i];
          if (listener.priority === priority) {
            removeEventListener.apply(this, [name, i]);
          }
        }
      } else {
        throw new Error('[Event:off] event\'s name must be specified.');
      }
    }

    /**
     * Sort event listeners by priority
     *
     * @param {string} name
     * @param {string} type
     */

  }, {
    key: 'sort',
    value: function sort(name) {
      var type = arguments.length <= 1 || arguments[1] === undefined ? EventManager.SORT_ASCENDING : arguments[1];

      if (this.get(name).sorted) {
        return;
      }

      var total = this.events[name].listeners.length;
      var pos = void 0,
          guard = void 0,
          listener = void 0,
          temporary = void 0;
      for (var i = 0; i < total - 1; i++) {
        pos = i;
        for (var j = i + 1; j < total; j++) {
          guard = this.events[name].listeners[pos];
          listener = this.events[name].listeners[j];
          if (type === EventManager.SORT_ASCENDING && guard.priority > listener.priority || type === EventManager.SORT_DESCENDING && guard.priority < listener.priority) {
            pos = j;
          }
        }

        if (i !== pos) {
          temporary = this.events[name].listeners[i];
          this.events[name].listeners[i] = this.events[name].listeners[pos];
          this.events[name].listeners[pos] = temporary;
        }
      }
    }

    /**
     * Check whether event's name has been registered yet
     *
     * @param {string} name
     * @returns {boolean}
     */

  }, {
    key: 'has',
    value: function has(name) {
      return _typeof(this.events[name]) === 'object';
    }

    /**
     * Get event item
     *
     * @param string name
     * @returns {*}
     */

  }, {
    key: 'get',
    value: function get(name) {
      return this.has(name) ? this.events[name] : getEventItem([], true);
    }

    /**
     * Emit an event
     *
     * @param {string} name
     * @param {Event} event
     * @throws Error An error exception will be thrown when event is not an instance of Event
     */

  }, {
    key: 'emit',
    value: function emit(event) {
      var _this = this;

      if (!(event instanceof _event2.default)) {
        throw new Error('[Event::emit] event must be an instance of Event');
      }
      var name = event.name;
      this.sort(name);

      var listeners = this.get(name).listeners;
      var total = listeners.length;
      var parallels = [];

      var _loop = function _loop(i) {
        parallels.push(function (done) {
          return listeners[i].runner(event, done);
        });
      };

      for (var i = 0; i < total; i++) {
        _loop(i);
      }

      // run tasks
      if (parallels.length) {
        if (event.parallel === true) {
          _async2.default.parallel(parallels, function (err, results) {
            onAsyncCompleted.apply(_this, [event, err, results]);
          });
        } else {
          _async2.default.series(parallels, function (err, results) {
            onAsyncCompleted.apply(_this, [event, err, results]);
          });
        }
      }
    }
  }]);

  return EventManager;
}();

exports.default = EventManager;