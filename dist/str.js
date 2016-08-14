'use strict';

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
    key: 'lcfirst',
    value: function lcfirst(string) {
      return string.charAt(0).toLowerCase() + string.slice(1);
    }
  }, {
    key: 'ucfirst',
    value: function ucfirst(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }, {
    key: 'changeFirstCase',
    value: function changeFirstCase(string, delimiter, callback) {
      var pattern = new RegExp('^([a-zA-Z])|\\' + delimiter + '([a-zA-Z])', 'ig');
      string.replace(pattern, function () {
        var char = (arguments.length <= 1 ? undefined : arguments[1]) || (arguments.length <= 2 ? undefined : arguments[2]),
            charAt = arguments.length <= 3 ? undefined : arguments[3];
        if (typeof (arguments.length <= 1 ? undefined : arguments[1]) === 'undefined') {
          string = string.slice(0, charAt + 1) + callback(char) + string.slice(charAt + 2);
        } else {
          string = string.slice(0, charAt) + callback(char) + string.slice(charAt + 1);
        }
      });
      return string;
    }
  }, {
    key: 'upperCaseFirst',
    value: function upperCaseFirst(string, delimiter) {
      return this.changeFirstCase(string, delimiter, function (char) {
        return Str.ucfirst(char);
      });
    }
  }, {
    key: 'lowerCaseFirst',
    value: function lowerCaseFirst(string, delimiter) {
      return this.changeFirstCase(string, delimiter, function (char) {
        return Str.lcfirst(char);
      });
    }
  }]);

  return Str;
}();

exports.default = Str;