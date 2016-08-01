'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _route = require('./route');

var _route2 = _interopRequireDefault(_route);

var _request = require('../request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Router = function () {
  function Router() {
    var routes = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Router);

    this.routes = routes;
  }

  _createClass(Router, [{
    key: 'add',
    value: function add(route) {
      if ((typeof route === 'undefined' ? 'undefined' : _typeof(route)) !== 'object') {
        throw new Error('[Router::addRoute] route must be an object');
      }

      if (!(route instanceof _route2.default)) {
        route = _route2.default.from(route);
      }

      this.routes[route.name] = route;
    }
  }, {
    key: 'has',
    value: function has(name) {
      return typeof this.routes[name] !== 'undefined';
    }
  }, {
    key: 'remove',
    value: function remove(name) {
      if (this.has(name)) {
        delete this.routes[name];
      }
    }
  }, {
    key: 'get',
    value: function get(name) {
      return this.has(name) ? this.routes[name] : null;
    }
  }, {
    key: 'route',
    value: function route(request) {
      if (!(request instanceof _request2.default)) {
        throw new Error('[Router::route] request must be an instance of Http/Request');
      }

      var names = Object.keys(this.routes);
      for (var i = 0; i < names.length; i++) {
        var route = this.get(names[i]);
        if (route instanceof _route2.default) {
          if (route.match(request)) {
            return route;
          }
        }
      }
    }
  }]);

  return Router;
}();

exports.default = Router;