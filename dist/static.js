'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bag = require('./bag');

var _bag2 = _interopRequireDefault(_bag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Static = function StaticBag() {
  _classCallCheck(this, StaticBag);
};
Object.getOwnPropertyNames(_bag2.default.prototype).concat(Object.getOwnPropertySymbols(_bag2.default.prototype)).forEach(function (prop) {
  if (prop.match(/^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length|clean)$/)) return;
  Object.defineProperty(Static, prop, Object.getOwnPropertyDescriptor(_bag2.default.prototype, prop));
});
Static.data = Static;
Object.defineProperty(Static, 'clean', Object.assign(Object.getOwnPropertyDescriptor(_bag2.default.prototype, 'clean'), {
  value: function value() {
    Object.keys(Static).forEach(function (key) {
      if (key === 'data') return;
      delete Static[key];
    });
    Static.data = Static;
  }
}));

exports.default = Static;