'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bag = require('../../bag');

var _bag2 = _interopRequireDefault(_bag);

var _request = require('../request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Fetcher = function (_Bag) {
  _inherits(Fetcher, _Bag);

  /**
   * Constructor
   * @param {Request} request
   * @param {?Object} [rules={}]
   */
  function Fetcher(request) {
    var rules = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Fetcher);

    var _this = _possibleConstructorReturn(this, (Fetcher.__proto__ || Object.getPrototypeOf(Fetcher)).call(this));

    _this._request = request;
    _this._rules = new _bag2.default(rules);
    return _this;
  }

  _createClass(Fetcher, [{
    key: 'addRule',
    value: function addRule(name, rule) {
      if (this.has(name)) {
        this.set(name, Object.assign(this.get(name), rule));
      } else {
        this.set(name, rule);
      }
    }
  }, {
    key: 'removeRule',
    value: function removeRule(name, rule) {
      if (this.has(name)) {
        var item = this.get(name);
        delete item[rule];
        this.set(name, item);
      }
    }
  }, {
    key: 'require',
    value: function require(name) {
      this.addRule(name, { require: true });
    }
  }, {
    key: 'allowNull',
    value: function allowNull(name) {
      this.addRule(name, { null: true });
    }
  }, {
    key: 'allowEmpty',
    value: function allowEmpty(name) {
      this.addRule(name, { empty: true });
    }
  }]);

  return Fetcher;
}(_bag2.default);

exports.default = Fetcher;