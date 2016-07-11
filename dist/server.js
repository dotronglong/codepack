'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bag = require('./bag');

var _bag2 = _interopRequireDefault(_bag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var http = require('http');

var Server = function Server() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  _classCallCheck(this, Server);

  this.options = new _bag2.default(options);
};

exports.default = Server;