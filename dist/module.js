'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class = require('./class');

var _class2 = _interopRequireDefault(_class);

var _static = require('./static');

var _static2 = _interopRequireDefault(_static);

var _singleton = require('./singleton');

var _singleton2 = _interopRequireDefault(_singleton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Module = function (_Class$combine) {
  (0, _inherits3.default)(Module, _Class$combine);

  function Module() {
    (0, _classCallCheck3.default)(this, Module);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Module).apply(this, arguments));
  }

  return Module;
}(_class2.default.combine(_static2.default, _singleton2.default));

exports.default = Module;