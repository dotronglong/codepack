"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * String processor
 * @todo Manipulate string
 */
var Str = function () {
  function Str() {
    _classCallCheck(this, Str);
  }

  _createClass(Str, null, [{
    key: "changeFirstCase",

    /**
     * Modify first case of string with delimiter
     * @access private
     * @param {!string} string String to modify first case
     * @param {?string} delimiter Delimiter of string
     * @param {?function} callback Callback to deal with character
     * @returns {string}
     */
    value: function changeFirstCase(string, delimiter, callback) {
      var pattern = new RegExp("^([a-zA-Z])|\\" + delimiter + "([a-zA-Z])", "ig");
      string.replace(pattern, function () {
        var char = (arguments.length <= 1 ? undefined : arguments[1]) || (arguments.length <= 2 ? undefined : arguments[2]),
            charAt = arguments.length <= 3 ? undefined : arguments[3];
        if (typeof (arguments.length <= 1 ? undefined : arguments[1]) === "undefined") {
          string = string.slice(0, charAt + 1) + callback(char) + string.slice(charAt + 2);
        } else {
          string = string.slice(0, charAt) + callback(char) + string.slice(charAt + 1);
        }
      });
      return string;
    }

    /**
     * Change the first case of string (or before delimiter character) to upper case
     * @param {!string} string String to modify first case
     * @param {?string} delimiter Delimiter of string
     * @returns {string}
     */

  }, {
    key: "upperCaseFirst",
    value: function upperCaseFirst(string, delimiter) {
      return this.changeFirstCase(string, delimiter, function (char) {
        return char.toUpperCase();
      });
    }

    /**
     * Change the first case of string (or before delimiter character) to lower case
     * @param {!string} string String to modify first case
     * @param {?string} delimiter Delimiter of string
     * @returns {string}
     */

  }, {
    key: "lowerCaseFirst",
    value: function lowerCaseFirst(string, delimiter) {
      return this.changeFirstCase(string, delimiter, function (char) {
        return char.toLowerCase();
      });
    }

    /**
     * Change the first case of string to lower case
     * @param {!string} string String to modify first case
     * @returns {string}
     */

  }, {
    key: "lcfirst",
    value: function lcfirst(string) {
      return Str.lowerCaseFirst(string);
    }

    /**
     * Change the first case of string to upper case
     * @param {!string} string String to modify first case
     * @returns {string}
     */

  }, {
    key: "ucfirst",
    value: function ucfirst(string) {
      return Str.upperCaseFirst(string);
    }
  }]);

  return Str;
}();

exports.default = Str;