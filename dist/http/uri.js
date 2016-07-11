'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
  }]);

  return Uri;
}();

exports.default = Uri;

Uri.SCHEME_HTTP = 'http';
Uri.SCHEME_HTTPS = 'https';
Uri.PORT_HTTP = 80;
Uri.PORT_HTTPS = 443;