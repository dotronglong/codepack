"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Plugin = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bag = require("./bag");

var _bag2 = _interopRequireDefault(_bag);

var _router = require("./http/routing/router");

var _router2 = _interopRequireDefault(_router);

var _collection = require("./collection");

var _collection2 = _interopRequireDefault(_collection);

var _manager = require("./event/manager");

var _manager2 = _interopRequireDefault(_manager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Application's Plugin
 */
var Plugin = exports.Plugin = function () {
  /**
   * Constructor
   * @param {App} app Current application
   */
  function Plugin(app) {
    _classCallCheck(this, Plugin);

    /**
     * Application
     * @type {App}
     */
    this.app = app;
  }

  /**
   * Call when application is booting
   */


  _createClass(Plugin, [{
    key: "onBoot",
    value: function onBoot() {}

    /**
     * Call when application is booted
     */

  }, {
    key: "onReady",
    value: function onReady() {}
  }]);

  return Plugin;
}();

var App = function () {
  /**
   * Constructor
   * @param {Object} options Application's configuration
   */
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

    /**
     * Router
     * @type {Router}
     */
    this.router = new _router2.default();
  }

  _createClass(App, [{
    key: "setUp",
    value: function setUp() {
      var _this = this;

      var plugins = this.plugins.all().map(function (plugin) {
        if (typeof plugin === 'function') {
          plugin = new plugin(_this);
        }
        if ((typeof plugin === "undefined" ? "undefined" : _typeof(plugin)) === 'object') {
          if (plugin instanceof Plugin) {
            plugin.app = _this;
          } else {
            throw new Error("[App#setUp] plugin must be an instance of Plugin");
          }
        } else {
          throw new Error("[App#setUp] This type of plugin is not supported.");
        }

        /* Run onBoot */
        plugin.onBoot();

        return plugin;
      });
      this.plugins.replace(plugins);
    }
  }, {
    key: "tearDown",
    value: function tearDown() {
      this.plugins.forEach(function (plugin) {
        return plugin.onReady();
      });
    }
  }, {
    key: "run",
    value: function run() {
      this.setUp();
      this.tearDown();
    }
  }, {
    key: "options",
    get: function get() {
      if (typeof this._options === "undefined") {
        this._options = new _bag2.default();
      }

      return this._options;
    },
    set: function set(options) {
      this.options.replace(options);
    }
  }]);

  return App;
}();

exports.default = App;