"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Connection = function Connection() {
  var request = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
  var response = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
  var server = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

  _classCallCheck(this, Connection);

  this.request = request;
  this.response = response;
  this.server = server;
};

exports.default = Connection;