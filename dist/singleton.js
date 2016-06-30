'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _class = require('./class');

var _class2 = _interopRequireDefault(_class);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Singleton = function () {
  function Singleton() {
    (0, _classCallCheck3.default)(this, Singleton);
  }

  (0, _createClass3.default)(Singleton, null, [{
    key: 'getInstance',
    value: function getInstance() {
      if (typeof this.instance === 'undefined') {
        this.instance = this.newInstance();
        _class2.default.setInstanceof(this.instance, this.name);
      }

      return this.instance;
    }
  }, {
    key: 'setInstance',
    value: function setInstance(instance) {
      this.instance = instance;
    }
  }, {
    key: 'newInstance',
    value: function newInstance() {
      return new this();
    }
  }]);
  return Singleton;
}();

exports.default = Singleton;