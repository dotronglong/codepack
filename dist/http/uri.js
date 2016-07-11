'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bag = require('../bag');

var _bag2 = _interopRequireDefault(_bag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Uri = function () {
  function Uri(scheme, user, pwd, host, port) {
    var path = arguments.length <= 5 || arguments[5] === undefined ? '/' : arguments[5];
    var query = arguments.length <= 6 || arguments[6] === undefined ? '' : arguments[6];
    var fragment = arguments.length <= 7 || arguments[7] === undefined ? '' : arguments[7];

    _classCallCheck(this, Uri);

    this.scheme = scheme;
    this.user = user;
    this.pwd = pwd;
    this.host = host;
    this.port = port;
    this.path = path;
    this.query = query;
    this.fragment = fragment;
  }

  _createClass(Uri, [{
    key: 'toString',
    value: function toString() {
      var query = this.query.toString();
      query = query === '' ? '' : '?' + query;

      var scheme = this.scheme,
          userInfo = this.userInfo === '' ? '' : this.userInfo + '@',
          host = this.host,
          port = this.port === Uri.PORT_HTTP && this.scheme === Uri.SCHEME_HTTP || this.port === Uri.PORT_HTTPS && this.scheme === Uri.SCHEME_HTTPS || typeof this.port === 'undefined' ? '' : ':' + this.port,
          path = this.path,
          fragment = this.fragment === '' ? '' : '#' + this.fragment;

      return scheme + '://' + userInfo + host + port + path + query + fragment;
    }
  }, {
    key: 'scheme',
    get: function get() {
      return this._scheme;
    },
    set: function set(scheme) {
      this._scheme = typeof scheme === 'undefined' ? Uri.SCHEME_HTTP : scheme;
    }
  }, {
    key: 'user',
    get: function get() {
      return this._user;
    },
    set: function set(user) {
      this._user = user;
    }
  }, {
    key: 'pwd',
    get: function get() {
      return this._pwd;
    },
    set: function set(pwd) {
      this._pwd = pwd;
    }
  }, {
    key: 'host',
    get: function get() {
      return this._host;
    },
    set: function set(host) {
      if (typeof host === 'undefined') {
        this._host = '';
      } else {
        var matches = host.match(/^([a-zA-Z0-9_.-]+):?(\d+)?$/i);
        if (matches) {
          this._host = matches[1];
          this._port = typeof matches[2] === 'undefined' ? this._port : matches[2];
        }
      }
    }
  }, {
    key: 'port',
    get: function get() {
      return this._port;
    },
    set: function set(port) {
      if (typeof port === 'undefined' && this._port) {
        return;
      }

      this._port = port;
    }
  }, {
    key: 'userInfo',
    get: function get() {
      return this._user !== '' && this._pwd !== '' ? this._user + ':' + this._pwd : '';
    },
    set: function set(userInfo) {
      if (typeof userInfo === 'undefined' || userInfo === '') {
        this._user = this._pwd = '';
        return;
      }

      var args = userInfo.split(':');
      this.user = args[0];
      this.pwd = args[1];
    }
  }, {
    key: 'query',
    get: function get() {
      return this._query;
    },
    set: function set(query) {
      var _this = this;

      if (typeof query === 'undefined') {
        return;
      }
      this._query = new _bag2.default();
      query.split('&').forEach(function (v) {
        var args = v.split('=');
        _this._query.set(args[0], args[1]);
      });
    }
  }], [{
    key: 'from',
    value: function from(string) {
      var pattern = /^([a-z][a-z0-9+.-]*):(?:\/\/((?:(?=((?:[a-z0-9-._~!$&'()*+,;=:]|%[0-9A-F]{2})*))(\3)@)?(?=(\[[0-9A-F:.]{2,}\]|(?:[a-z0-9-._~!$&'()*+,;=]|%[0-9A-F]{2})*))\5(?::(?=(\d*))\6)?)(\/(?=((?:[a-z0-9-._~!$&'()*+,;=:@\/]|%[0-9A-F]{2})*))\8)?|(\/?(?!\/)(?=((?:[a-z0-9-._~!$&'()*+,;=:@\/]|%[0-9A-F]{2})*))\10)?)(?:\?(?=((?:[a-z0-9-._~!$&'()*+,;=:@\/?]|%[0-9A-F]{2})*))\11)?(?:#(?=((?:[a-z0-9-._~!$&'()*+,;=:@\/?]|%[0-9A-F]{2})*))\12)?$/i;
      var args = null,
          uri = new Uri();
      if (args = string.match(pattern)) {
        uri.scheme = args[1];
        uri.userInfo = args[3];
        uri.host = args[5];
        uri.port = args[6];
        uri.path = args[7];
        uri.query = args[11];
        uri.fragment = args[12];
      }

      return this.validate(uri);
    }
  }, {
    key: 'validate',
    value: function validate(uri) {
      if (typeof uri.port === 'undefined' && typeof uri.scheme !== 'undefined') {
        switch (uri.scheme) {
          case Uri.SCHEME_HTTP:
            uri.port = Uri.PORT_HTTP;
            break;
          case Uri.SCHEME_HTTPS:
            uri.port = Uri.PORT_HTTPS;
            break;
          default:
            throw new Error(uri.scheme + ' scheme is not supported yet.');
        }
      }

      return uri;
    }
  }]);

  return Uri;
}();

exports.default = Uri;

Uri.SCHEME_HTTP = 'http';
Uri.SCHEME_HTTPS = 'https';
Uri.PORT_HTTP = 80;
Uri.PORT_HTTPS = 443;