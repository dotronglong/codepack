"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var clc = require("cli-color");

var cli = function () {
  function cli() {
    _classCallCheck(this, cli);
  }

  _createClass(cli, null, [{
    key: "error",
    value: function error() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this.line(this.COLOR_ERROR, args);
    }
  }, {
    key: "warning",
    value: function warning() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      this.line(this.COLOR_WARNING, args);
    }
  }, {
    key: "info",
    value: function info() {
      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      this.line(this.COLOR_INFO, args);
    }
  }, {
    key: "success",
    value: function success() {
      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      this.line(this.COLOR_SUCCESS, args);
    }
  }, {
    key: "line",
    value: function line(color, args) {
      var line = "";
      if (Array.isArray(args)) {
        line = args.join(" ");
      }

      var msg = clc[color](line);
      this.NEW_LINE ? console.log(msg) : process.stdout.write(msg);
    }
  }]);

  return cli;
}();

cli.NEW_LINE = true;
cli.COLOR_ERROR = "red";
cli.COLOR_WARNING = "magenta";
cli.COLOR_INFO = "blue";
cli.COLOR_SUCCESS = "green";

exports.default = cli;