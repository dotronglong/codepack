'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var colors = require('colors');

var Console = function () {
  function Console() {
    (0, _classCallCheck3.default)(this, Console);
  }

  (0, _createClass3.default)(Console, null, [{
    key: 'error',
    value: function error() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this.line(this.COLOR_ERROR, args);
    }
  }, {
    key: 'warning',
    value: function warning() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      this.line(this.COLOR_WARNING, args);
    }
  }, {
    key: 'info',
    value: function info() {
      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      this.line(this.COLOR_INFO, args);
    }
  }, {
    key: 'success',
    value: function success() {
      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      this.line(this.COLOR_SUCCESS, args);
    }
  }, {
    key: 'line',
    value: function line(color, args) {
      var line = '';
      if (Array.isArray(args)) {
        line = args.join(' ');
      }

      this.NEW_LINE ? console.log(line[color]) : process.stdout.write(line[color]);
    }
  }]);
  return Console;
}();

Console.NEW_LINE = true;
Console.COLOR_ERROR = 'red';
Console.COLOR_WARNING = 'magenta';
Console.COLOR_INFO = 'blue';
Console.COLOR_SUCCESS = 'green';

exports.default = Console;