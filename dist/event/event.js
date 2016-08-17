"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Represent for an event emitted by EventManager
 */
var Event = function () {
  /**
   * Constructor
   * @param {boolean} [parallel=false] Determine whether or not to allow running listeners in parallel
   */
  function Event() {
    var parallel = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

    _classCallCheck(this, Event);

    /**
     * Define whether or not to run this event's listeners in parallel
     * @type {boolean}
     */
    this.parallel = parallel;

    /**
     * @access private
     * @type {boolean}
     */
    this.continue = true;

    /**
     * Detail exception if there was an error
     * @type {Error}
     */
    this.exception = null;
  }

  /**
   * Stop running event any furthermore
   */


  _createClass(Event, [{
    key: "stop",
    value: function stop() {
      this.continue = false;
    }

    /**
     * Determine if the event is actually stopped or not
     * @returns {boolean}
     */

  }, {
    key: "stopped",
    get: function get() {
      return this.continue === false;
    }
  }]);

  return Event;
}();
/**
 * Name of event
 * Derived class must override this static attribute
 * @type {string}
 */


exports.default = Event;
Event.NAME = "";