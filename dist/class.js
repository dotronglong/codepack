'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _getOwnPropertySymbols = require('babel-runtime/core-js/object/get-own-property-symbols');

var _getOwnPropertySymbols2 = _interopRequireDefault(_getOwnPropertySymbols);

var _getOwnPropertyNames = require('babel-runtime/core-js/object/get-own-property-names');

var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var INSTANCEOF_PROPERTY_NAME = '__implements';

var Class = function () {
  function Class() {
    (0, _classCallCheck3.default)(this, Class);
  }

  (0, _createClass3.default)(Class, null, [{
    key: 'combine',
    value: function combine(baseClass) {
      for (var _len = arguments.length, mixins = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        mixins[_key - 1] = arguments[_key];
      }

      var base = function (_baseClass) {
        (0, _inherits3.default)(_Combined, _baseClass);

        function _Combined() {
          var _Object$getPrototypeO;

          (0, _classCallCheck3.default)(this, _Combined);

          for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          var _this = (0, _possibleConstructorReturn3.default)(this, (_Object$getPrototypeO = (0, _getPrototypeOf2.default)(_Combined)).call.apply(_Object$getPrototypeO, [this].concat(args)));

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
        (0, _getOwnPropertyNames2.default)(source).concat((0, _getOwnPropertySymbols2.default)(source)).forEach(function (prop) {
          if (prop.match(/^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/)) return;
          (0, _defineProperty2.default)(target, prop, (0, _getOwnPropertyDescriptor2.default)(source, prop));
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
        (0, _defineProperty2.default)(object, INSTANCEOF_PROPERTY_NAME, {
          enumerable: false,
          configurable: false,
          writable: true,
          value: []
        });
      }

      object[INSTANCEOF_PROPERTY_NAME].push(typeof target === 'function' ? target.name : target);
    }
  }]);
  return Class;
}();

exports.default = Class;