"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Module = function () {
  function Module() {
    (0, _classCallCheck3.default)(this, Module);
  }

  (0, _createClass3.default)(Module, null, [{
    key: "load",
    value: function load(name) {}
  }, {
    key: "register",
    value: function register(name, module) {
      this.modules[name] = module;
    }
  }, {
    key: "setPath",
    value: function setPath(path) {
      this.path = path;
    }
  }, {
    key: "getPath",
    value: function getPath() {
      return this.path;
    }
  }]);
  return Module;
}();

exports.default = Module;