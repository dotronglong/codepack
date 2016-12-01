"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _route = require("./route");

var _route2 = _interopRequireDefault(_route);

var _request = require("../request");

var _request2 = _interopRequireDefault(_request);

var _bag = require("../../bag");

var _bag2 = _interopRequireDefault(_bag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Router
 *
 * Manage and route request
 */

var Router = function (_Bag) {
  _inherits(Router, _Bag);

  /**
   * Constructor
   * @param {Route[]} routes
   */

  function Router() {
    var routes = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

    _classCallCheck(this, Router);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Router).call(this));

    if (routes.length) {
      routes.forEach(function (route) {
        return _this.add(route);
      });
    }
    return _this;
  }

  /**
   * Add a route
   * @param {Object|Route} route
   */


  _createClass(Router, [{
    key: "add",
    value: function add(route) {
      if ((typeof route === "undefined" ? "undefined" : _typeof(route)) !== "object") {
        throw new Error("[Router#add] route must be an object");
      }

      if (!(route instanceof _route2.default)) {
        route = _route2.default.from(route);
      }

      this.set(route.name, route);
    }

    /**
     * An alias of delete method
     * @param {string} name
     */

  }, {
    key: "remove",
    value: function remove(name) {
      this.delete(name);
    }

    /**
     * Route the request to find out the matching route
     * @param {Request} request
     * @returns {Route|null} Return the matched route or null if there is no appropriate routes
     */

  }, {
    key: "route",
    value: function route(request) {
      if (!(request instanceof _request2.default)) {
        throw new Error("[Router#route] request must be an instance of Http/Request");
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _slicedToArray(_step.value, 2);

          var name = _step$value[0];
          var route = _step$value[1];

          if (route.match(request)) {
            request.params = Object.assign(route.params, route.matches);
            return route;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return null;
    }
  }]);

  return Router;
}(_bag2.default);

exports.default = Router;