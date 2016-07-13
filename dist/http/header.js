'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _bag = require('../bag');

var _bag2 = _interopRequireDefault(_bag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = function (_Bag) {
  _inherits(Header, _Bag);

  function Header(data) {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Header).call(this, data));
  }

  _createClass(Header, [{
    key: 'has',
    value: function has(key) {
      return _get(Object.getPrototypeOf(Header.prototype), 'has', this).call(this, key.toLowerCase());
    }
  }, {
    key: 'get',
    value: function get(key) {
      var def = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      return _get(Object.getPrototypeOf(Header.prototype), 'get', this).call(this, key.toLowerCase(), def);
    }
  }, {
    key: 'set',
    value: function set(key, value) {
      _get(Object.getPrototypeOf(Header.prototype), 'set', this).call(this, key.toLowerCase(), value);
    }
  }, {
    key: 'remove',
    value: function remove(key) {
      _get(Object.getPrototypeOf(Header.prototype), 'remove', this).call(this, key.toLowerCase());
    }
  }]);

  return Header;
}(_bag2.default);

exports.default = Header;