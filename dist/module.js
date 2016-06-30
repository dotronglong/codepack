"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Module = function () {
  function Module() {
    _classCallCheck(this, Module);
  }

  _createClass(Module, null, [{
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