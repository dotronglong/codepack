'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Singleton = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class = require('./class');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Singleton = exports.Singleton = function () {
  function Singleton() {
    _classCallCheck(this, Singleton);
  }

  _createClass(Singleton, null, [{
    key: 'getInstance',
    value: function getInstance() {
      if (typeof this.instance === 'undefined') {
        this.instance = this.newInstance();
        _class.Class.setInstanceof(this.instance, this.name);
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