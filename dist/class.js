"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var INSTANCEOF_PROPERTY_NAME = "__implements";
var NOT_IN_ARRAY = -1;

function copy(target, source) {
  var all = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

  Object.getOwnPropertyNames(source).concat(Object.getOwnPropertySymbols(source)).forEach(function (prop) {
    if (all === false && prop.match(/^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/)) {
      return;
    }
    Object.defineProperty(target, prop, Object.getOwnPropertyDescriptor(source, prop));
  });
}

/**
 * Tools to deal with classes
 */

var Class = function () {
  function Class() {
    _classCallCheck(this, Class);
  }

  _createClass(Class, null, [{
    key: "methodExists",

    /**
     * Check whether or not a method exists in object
     * @ignore
     * @returns {boolean}
     */
    value: function methodExists(object, method) {
      return this.getMethods(object).indexOf(method) !== NOT_IN_ARRAY;
    }

    /**
     * Get all methods of an object
     * @ignore
     * @returns {Array}
     */

  }, {
    key: "getMethods",
    value: function getMethods(object) {
      var methods = [];
      if (typeof object.prototype === "undefined") {
        // temporary not support this case
        if (typeof object[INSTANCEOF_PROPERTY_NAME] !== "undefined") {
          object[INSTANCEOF_PROPERTY_NAME].forEach(function (o) {
            Class.getMethods(o).forEach(function (name) {
              if (name.match(/^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/)) return;
              if (methods.indexOf(name) === NOT_IN_ARRAY) {
                methods.push(name);
              }
            });
          });
        }
      } else {
        methods = methods.concat(Object.getOwnPropertyNames(object.prototype), Object.getOwnPropertySymbols(object.prototype));
      }
      return methods;
    }

    /**
     * Mixes many classes into one in order to allow to extend from multiple classes
     * @returns {Object}
     */

  }, {
    key: "mix",
    value: function mix(baseClass) {
      for (var _len = arguments.length, mixins = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        mixins[_key - 1] = arguments[_key];
      }

      var base = function (_baseClass) {
        _inherits(_Combined, _baseClass);

        function _Combined() {
          var _Object$getPrototypeO;

          _classCallCheck(this, _Combined);

          for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(_Combined)).call.apply(_Object$getPrototypeO, [this].concat(args)));

          _this[INSTANCEOF_PROPERTY_NAME] = [baseClass];
          mixins.forEach(function (mixin) {
            if (mixin.prototype.hasOwnProperty("init") === true) {
              mixin.prototype.init.call(_this);
            }

            _this[INSTANCEOF_PROPERTY_NAME].push(mixin);
          });
          return _this;
        }

        return _Combined;
      }(baseClass);

      mixins.forEach(function (mixin) {
        copy(base.prototype, mixin.prototype);
        copy(base, mixin);
      });

      return base;
    }

    /**
     * Determine whether or not an object is an instance of a class
     * @ignore
     * @param {Object} object Object to check
     * @param {Object} target Class object to test
     * @returns {boolean}
     */

  }, {
    key: "instanceof",
    value: function _instanceof(object, target) {
      if (typeof target === "function" && object instanceof target) {
        return true;
      }

      if (object.hasOwnProperty(INSTANCEOF_PROPERTY_NAME)) {
        var targetName = typeof target === "string" ? target : target.name;
        var implementClasses = object[INSTANCEOF_PROPERTY_NAME];
        for (var i = 0; i < implementClasses.length; i++) {
          if (implementClasses[i].name === targetName) {
            return true;
          }
        }
      }

      return false;
    }

    /**
     * Mark an object to be an instance of target's object
     * @ignore
     * @param {Object} object Object to be modified
     * @param {Object} target Class object be added as instance's class
     */

  }, {
    key: "setInstanceof",
    value: function setInstanceof(object, target) {
      if (object.hasOwnProperty(INSTANCEOF_PROPERTY_NAME) === false) {
        Object.defineProperty(object, INSTANCEOF_PROPERTY_NAME, {
          enumerable: false,
          configurable: false,
          writable: true,
          value: []
        });
      }

      object[INSTANCEOF_PROPERTY_NAME].push(target);
    }

    /**
     * Remove all properties on an object
     * @param {Object} object Object to be cleaned
     * @param {?Array} ignore List of ignoring properties, let them remain
     */

  }, {
    key: "cleanProperties",
    value: function cleanProperties(object, ignore) {
      ignore = typeof ignore === "undefined" ? [] : ignore;
      Object.keys(object).forEach(function (prop) {
        if (ignore.length && ignore.indexOf(prop) > NOT_IN_ARRAY) {
          return;
        }
        delete object[prop];
      });

      return object;
    }

    /**
     * Define a property on an object with an easy way
     * @param {Object} object The target object
     * @param {string} name Name of the property
     * @param {?*} [value=null] Initial value of property
     * @param {?boolean} [enumerable=true] Mark property as enumerable
     * @param {?writable} [writable=true] Mark property as writable
     * @param {?configurable} [configurable=true] Mark property as configurable
     */

  }, {
    key: "defineProperty",
    value: function defineProperty(object, name) {
      var value = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
      var enumerable = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];
      var writable = arguments.length <= 4 || arguments[4] === undefined ? true : arguments[4];
      var configurable = arguments.length <= 5 || arguments[5] === undefined ? true : arguments[5];

      Object.defineProperty(object, name, {
        configurable: configurable,
        enumerable: enumerable,
        writable: writable,
        value: value
      });
    }

    /**
     * Define a property which is not enumerable
     * @param {Object} object The target object
     * @param {string} name Name of the property
     * @param {?*} [value=null] Initial value of property
     */

  }, {
    key: "definePropertyNotEnumerable",
    value: function definePropertyNotEnumerable(object, name) {
      var value = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

      return this.defineProperty(object, name, value, false);
    }

    /**
     * Define a property which is not writable
     * @param {Object} object The target object
     * @param {string} name Name of the property
     * @param {?*} [value=null] Initial value of property
     */

  }, {
    key: "definePropertyNotWritable",
    value: function definePropertyNotWritable(object, name) {
      var value = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

      return this.defineProperty(object, name, value, true, false);
    }

    /**
     * Define a property which is not configurable
     * @param {Object} object The target object
     * @param {string} name Name of the property
     * @param {?*} [value=null] Initial value of property
     */

  }, {
    key: "definePropertyNotConfigurable",
    value: function definePropertyNotConfigurable(object, name) {
      var value = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

      return this.defineProperty(object, name, value, true, true, false);
    }
  }]);

  return Class;
}();

exports.default = Class;