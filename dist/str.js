"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Str = function () {
  function Str() {
    _classCallCheck(this, Str);
  }

  _createClass(Str, null, [{
    key: "lcfirst",
    value: function lcfirst(string) {
      return string.charAt(0).toLowerCase() + string.slice(1);
    }
  }, {
    key: "ucfirst",
    value: function ucfirst(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }]);

  return Str;
}();

exports.default = Str;