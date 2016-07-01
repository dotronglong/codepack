'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Descriptor = function () {
  function Descriptor() {
    var name = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
    var content = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    (0, _classCallCheck3.default)(this, Descriptor);

    this.name = name;
    this.content = content;
  }

  (0, _createClass3.default)(Descriptor, [{
    key: 'getName',
    value: function getName() {
      return this.name;
    }
  }, {
    key: 'setName',
    value: function setName(name) {
      this.name = name;
    }
  }, {
    key: 'getContent',
    value: function getContent() {
      return this.content;
    }
  }, {
    key: 'setContent',
    value: function setContent(content) {
      this.content = content;
    }
  }]);
  return Descriptor;
}();

exports.default = Descriptor;