'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Event = function () {
  function Event() {
    var name = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
    var parallel = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

    _classCallCheck(this, Event);

    this.name = name;
    this.parallel = parallel;
    this.continue = true;
    this.exception = null;
  }

  _createClass(Event, [{
    key: 'stop',
    value: function stop() {
      this.continue = false;
      return true;
    }
  }, {
    key: 'stopped',
    get: function get() {
      return this.continue === false;
    }
  }]);

  return Event;
}();

exports.default = Event;