'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var INSTANCEOF_PROPERTY_NAME = '__implements';
var NOT_IN_ARRAY = -1;

var Class = function () {
  function Class() {
    _classCallCheck(this, Class);
  }

  _createClass(Class, null, [{
    key: 'combine',
    value: function combine(baseClass) {
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

          var classNames = [baseClass.name];
          mixins.forEach(function (mixin) {
            if (mixin.prototype.hasOwnProperty('init') === true) {
              mixin.prototype.init.call(_this);
            }

            classNames.push(mixin.name);
          });
          _this[INSTANCEOF_PROPERTY_NAME] = classNames;
          return _this;
        }

        return _Combined;
      }(baseClass);
      var copyProps = function copyProps(target, source) {
        Object.getOwnPropertyNames(source).concat(Object.getOwnPropertySymbols(source)).forEach(function (prop) {
          if (prop.match(/^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/)) return;
          Object.defineProperty(target, prop, Object.getOwnPropertyDescriptor(source, prop));
        });
      };

      mixins.forEach(function (mixin) {
        copyProps(base.prototype, mixin.prototype);
        copyProps(base, mixin);
      });

      return base;
    }
  }, {
    key: 'instanceof',
    value: function _instanceof(object, target) {
      if (typeof target === 'function' && object instanceof target) {
        return true;
      }

      if (object.hasOwnProperty(INSTANCEOF_PROPERTY_NAME)) {
        var targetName = typeof target === 'string' ? target : target.name;
        var classNames = object[INSTANCEOF_PROPERTY_NAME];
        for (var i = 0; i < classNames.length; i++) {
          if (classNames[i] === targetName) {
            return true;
          }
        }
      }

      return false;
    }
  }, {
    key: 'setInstanceof',
    value: function setInstanceof(object, target) {
      if (object.hasOwnProperty(INSTANCEOF_PROPERTY_NAME) === false) {
        Object.defineProperty(object, INSTANCEOF_PROPERTY_NAME, {
          enumerable: false,
          configurable: false,
          writable: true,
          value: []
        });
      }

      object[INSTANCEOF_PROPERTY_NAME].push(typeof target === 'function' ? target.name : target);
    }
  }, {
    key: 'cleanProperties',
    value: function cleanProperties(object, ignore) {
      ignore = typeof ignore === 'undefined' ? [] : ignore;
      Object.keys(object).forEach(function (prop) {
        if (ignore.length && ignore.indexOf(prop) > NOT_IN_ARRAY) {
          return;
        }
        delete object[prop];
      });

      return object;
    }
  }]);

  return Class;
}();

exports.default = Class;