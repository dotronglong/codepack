'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _module = require('./module');

var _module2 = _interopRequireDefault(_module);

var _scandir = require('scandir');

var _scandir2 = _interopRequireDefault(_scandir);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Package = function () {
  function Package() {
    (0, _classCallCheck3.default)(this, Package);
  }

  (0, _createClass3.default)(Package, null, [{
    key: 'addModule',
    value: function addModule(module) {
      if (module instanceof _module2.default) {
        this.Modules[module.getName()] = module;
      } else {
        throw new Error('module MUST be an instance of Module');
      }
    }
  }, {
    key: 'hasModule',
    value: function hasModule(name) {
      return typeof this.Modules[name] !== 'undefined';
    }
  }, {
    key: 'removeModule',
    value: function removeModule(name) {
      if (this.hasModule(name)) {
        delete this.Modules[name];
      }
    }
  }, {
    key: 'scanModules',
    value: function scanModules(path) {}
  }]);
  return Package;
}();

exports.default = Package;

Package.Modules = {};