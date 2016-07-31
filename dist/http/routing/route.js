'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _request = require('../request');

var _request2 = _interopRequireDefault(_request);

var _bag = require('../../bag');

var _bag2 = _interopRequireDefault(_bag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SRC_HOST = 'host';
var SRC_PATH = 'path';

function scanAndReplace(text, source, dest) {
  if (text === null) {
    // do nothing
    return;
  }

  var o = Route.MATCH_OPENING_TAG,
      c = Route.MATCH_CLOSING_TAG;

  var pattern = o + '(\\w+)' + c,
      matches = text.match(new RegExp(pattern, 'ig')),
      args = Object.keys(source);

  if (matches === null || !args.length || (typeof dest === 'undefined' ? 'undefined' : _typeof(dest)) !== 'object') {
    // do nothing
    return;
  }

  // loop matches to replace in text
  matches.forEach(function (match) {
    var replacement = /\w+/,
        argument = match.replace(new RegExp(o + '|' + c, 'ig'), '');

    for (var i = 0; i < args.length; i++) {
      if (match === '' + o + args[i] + c) {
        argument = args[i];
        replacement = source[argument];
        break;
      }
    }

    if ((typeof replacement === 'undefined' ? 'undefined' : _typeof(replacement)) === 'object' && replacement instanceof RegExp) {
      replacement = replacement.toString();
      replacement = replacement.replace(/^\/(.*)\/[a-z]*$/ig, '$1');
    }

    text = text.replace(match, '(' + replacement + ')');
    dest[argument] = null;
  });

  return text;
}

function matchAndApply(text, pattern, dest) {
  if (typeof text === 'undefined' || typeof pattern === 'undefined') {
    return false;
  }

  if (text === null) {
    return true;
  }

  var matches = text.match(pattern);
  if (matches === null) {
    return false;
  }

  var args = Object.keys(dest);
  for (var i = 1; i < matches.length; i++) {
    dest[args[i - 1]] = matches[i];
  }

  return true;
}

function validateRegExp(target) {
  if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object' && target instanceof RegExp) {
    target = target.toString();
  }

  // consider to check for string only?
  return '^' + target + '$';
}

var Route = function () {
  function Route() {
    var name = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
    var method = arguments.length <= 1 || arguments[1] === undefined ? _request2.default.METHOD_GET : arguments[1];
    var path = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];
    var host = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
    var port = arguments.length <= 4 || arguments[4] === undefined ? null : arguments[4];
    var demands = arguments.length <= 5 || arguments[5] === undefined ? {} : arguments[5];
    var options = arguments.length <= 6 || arguments[6] === undefined ? {} : arguments[6];

    _classCallCheck(this, Route);

    this.name = name;
    this.method = method;
    this.path = path;
    this.host = host;
    this.port = port;
    this.demands = demands;
    this.options = options;
    this.params = {};
  }

  _createClass(Route, [{
    key: 'match',
    value: function match(path) {
      var host = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
      var port = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

      this.preMatch();

      var isHostMatched = matchAndApply(host, this.host, this._params[SRC_HOST]),
          isPathMatched = matchAndApply(path, this.path, this._params[SRC_PATH]),
          isPortMatched = this.port === null || port !== null && port === this.port ? true : false;

      this.postMatch();

      return isHostMatched && isPathMatched && isPortMatched;
    }
  }, {
    key: 'preMatch',
    value: function preMatch() {
      this.cleanUp();

      this.reservedHost = this.host;
      this.reservedPath = this.path;

      this.host = scanAndReplace(validateRegExp(this.host), this.demands, this._params[SRC_HOST]);
      this.path = scanAndReplace(validateRegExp(this.path), this.demands, this._params[SRC_PATH]);
    }
  }, {
    key: 'postMatch',
    value: function postMatch() {
      this.host = this.reservedHost;
      this.path = this.reservedPath;

      this.reservedHost = null;
      this.reservedPath = null;
    }
  }, {
    key: 'cleanUp',
    value: function cleanUp() {
      this._params[SRC_HOST] = {};
      this._params[SRC_PATH] = {};
    }
  }, {
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
  }, {
    key: 'params',
    get: function get() {
      return Object.assign({}, this._params[SRC_HOST], this._params[SRC_PATH]);
    },
    set: function set(params) {
      this._params = params;
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
      }
      if (typeof object.port !== 'undefined') {
        route.port = object.port;
      }
      if (typeof object.options !== 'undefined') {
        route.options = object.options;
      }
      if (typeof object.demands !== 'undefined') {
        route.demands = object.demands;
      }

      return route;
    }
  }]);

  return Route;
}();

exports.default = Route;

Route.MATCH_OPENING_TAG = '{';
Route.MATCH_CLOSING_TAG = '}';