'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _getOwnPropertySymbols = require('babel-runtime/core-js/object/get-own-property-symbols');

var _getOwnPropertySymbols2 = _interopRequireDefault(_getOwnPropertySymbols);

var _getOwnPropertyNames = require('babel-runtime/core-js/object/get-own-property-names');

var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _bag = require('./bag');

var _bag2 = _interopRequireDefault(_bag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Static = function StaticBag() {
  (0, _classCallCheck3.default)(this, StaticBag);
};
(0, _getOwnPropertyNames2.default)(_bag2.default.prototype).concat((0, _getOwnPropertySymbols2.default)(_bag2.default.prototype)).forEach(function (prop) {
  if (prop.match(/^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length|clean)$/)) return;
  (0, _defineProperty2.default)(Static, prop, (0, _getOwnPropertyDescriptor2.default)(_bag2.default.prototype, prop));
});
Static.data = Static;
Object.defineProperty(Static, 'clean', (0, _assign2.default)((0, _getOwnPropertyDescriptor2.default)(_bag2.default.prototype, 'clean'), {
  value: function value() {
    (0, _keys2.default)(Static).forEach(function (key) {
      if (key === 'data') return;
      delete Static[key];
    });
    Static.data = Static;
  }
}));

exports.default = Static;