'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bag = require('./bag');

var _bag2 = _interopRequireDefault(_bag);

var _collection = require('./collection');

var _collection2 = _interopRequireDefault(_collection);

var _manager = require('./event/manager');

var _manager2 = _interopRequireDefault(_manager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Plugin = function () {
  function Plugin(app) {
    _classCallCheck(this, Plugin);

    this.app = app;
  }

  /**
   * Call when application is booting
   */


  _createClass(Plugin, [{
    key: 'onBoot',
    value: function onBoot() {}

    /**
     * Call when application is booted
     */

  }, {
    key: 'onReady',
    value: function onReady() {}
  }]);

  return Plugin;
}();

var App = function () {
  function App(options) {
    _classCallCheck(this, App);

    /**
     * App configuration
     * @type {Bag}
     */
    this.options = options;

    /**
     * Server pool
     * @type {Collection}
     */
    this.servers = new _collection2.default();

    /**
     * App's plugins
     * @type {Collection}
     */
    this.plugins = new _collection2.default();

    /**
     * Event Manager
     * @type {EventManager}
     */
    this.events = new _manager2.default();
  }

  _createClass(App, [{
    key: 'register',
    value: function register(plugin) {
      this.plugins.add(plugin);
    }
  }, {
    key: 'setUp',
    value: function setUp() {
      this.plugins.forEach(function (plugin) {
        return plugin.onBoot();
      });
    }
  }, {
    key: 'tearDown',
    value: function tearDown() {
      this.plugins.forEach(function (plugin) {
        return plugin.onReady();
      });
    }
  }, {
    key: 'run',
    value: function run() {
      this.setUp();
      this.tearDown();
    }
  }, {
    key: 'options',
    get: function get() {
      if (typeof this._options === 'undefined') {
        this._options = new _bag2.default();
      }

      return this._options;
    },
    set: function set(options) {
      this._options.replace(options);
    }
  }]);

  return App;
}();

exports.default = App;

App.Plugin = Plugin;