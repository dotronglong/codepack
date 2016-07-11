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
  function Uri(scheme, user, pwd, host, port, path, query, fragment) {
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
      var uri = this.scheme;

      if (this.userInfo !== '') {
        uri += this.userInfo;
      }

      if (this.port !== Uri.PORT_HTTP) {
        uri += ':' + this.port;
      }

      var queries = this.query.all();
      var query = '';
      Object.keys(queries).map(function (v) {
        return query += '&' + v + '=' + queries[v];
      });
      if (query !== '') {
        uri += '?' + query;
      }

      if (this.fragment !== '') {
        uri += '#' + this.fragment;
      }

      return uri;
    }
  }, {
    key: 'userInfo',
    get: function get() {
      return this.user + ':' + this.pwd;
    },
    set: function set(userInfo) {
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
    key: 'parse',
    value: function parse(string) {
      var args = null,
          uri = new Uri();
      if (args = string.match(/^([a-z][a-z0-9+.-]*):(?:\/\/((?:(?=((?:[a-z0-9-._~!$&'()*+,;=:]|%[0-9A-F]{2})*))(\3)@)?(?=(\[[0-9A-F:.]{2,}\]|(?:[a-z0-9-._~!$&'()*+,;=]|%[0-9A-F]{2})*))\5(?::(?=(\d*))\6)?)(\/(?=((?:[a-z0-9-._~!$&'()*+,;=:@\/]|%[0-9A-F]{2})*))\8)?|(\/?(?!\/)(?=((?:[a-z0-9-._~!$&'()*+,;=:@\/]|%[0-9A-F]{2})*))\10)?)(?:\?(?=((?:[a-z0-9-._~!$&'()*+,;=:@\/?]|%[0-9A-F]{2})*))\11)?(?:#(?=((?:[a-z0-9-._~!$&'()*+,;=:@\/?]|%[0-9A-F]{2})*))\12)?$/i)) {
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
      var port = void 0;
      switch (uri.scheme) {
        case Uri.SCHEME_HTTPS:
          port = Uri.PORT_HTTPS;
          break;
        case Uri.SCHEME_HTTP:
        default:
          port = Uri.PORT_HTTP;
          break;
      }
      uri.port = port;

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