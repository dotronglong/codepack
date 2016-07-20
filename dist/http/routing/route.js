'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _request = require('../request');

var _request2 = _interopRequireDefault(_request);

var _bag = require('../../bag');

var _bag2 = _interopRequireDefault(_bag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Route = function () {
  function Route() {
    var name = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
    var method = arguments.length <= 1 || arguments[1] === undefined ? _request2.default.METHOD_GET : arguments[1];
    var path = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];
    var host = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
    var options = arguments.length <= 4 || arguments[4] === undefined ? {} : arguments[4];

    _classCallCheck(this, Route);

    this.name = name;
    this.method = method;
    this.path = path;
    this.host = host;
    this.options = options;
  }

  _createClass(Route, [{
    key: 'options',
    get: function get() {
      return this._options;
    },
    set: function set(options) {
      if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
        if (options instanceof _bag2.default) {
          this._options = options;
        } else {
          this._options = new _bag2.default(options);
        }
      }
    }
  }], [{
    key: 'from',
    value: function from(object) {
      var route = new this();
      if (typeof object.name !== 'undefined') {
        route.name = object.name;
      }
      if (typeof object.method !== 'undefined') {
        route.method = object.method;
      }
      if (typeof object.path !== 'undefined') {
        route.path = object.path;
      }
      if (typeof object.host !== 'undefined') {
        route.host = object.host;
      }if (typeof object.options !== 'undefined') {
        route.options = object.options;
      }

      return route;
    }
  }]);

  return Route;
}();

exports.default = Route;