'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class = require('./class');

var _class2 = _interopRequireDefault(_class);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NOT_IN_ARRAY = -1;
var basePath = '';
var scanForFiles = function scanForFiles(dir, only) {
  return new Promise(function (resolve, reject) {
    _fs2.default.readdir(dir, function (err, files) {
      var validFiles = [];
      files.forEach(function (file) {
        // make sure file does not contain "." at the beginning,
        // and if only is enabled, only require files are returned
        if (file.match(/^\./) || only.length && only.indexOf(file) === NOT_IN_ARRAY) {
          return;
        }
        validFiles.push(file);
      });
      resolve(validFiles);
    });
  });
};

var scanForDirectories = function scanForDirectories(files) {
  return new Promise(function (resolve, reject) {
    var promises = [];
    files.forEach(function (file) {
      promises.push(getFileInformation(file).then(function (stats) {
        if (stats.isDirectory()) {
          return file;
        }
        return null;
      }));
    });
    var directories = [];
    Promise.all(promises).then(function (files) {
      files.forEach(function (file) {
        if (file !== null) {
          directories.push(file);
        }
      });
      resolve(directories);
    });
  });
};

var getFileInformation = function getFileInformation(file) {
  return new Promise(function (resolve, reject) {
    _fs2.default.stat(file, function (err, stats) {
      resolve(stats);
    });
  });
};

var requireModuleDescriptor = function requireModuleDescriptor(dir) {
  return new Promise(function (resolve, reject) {
    var file = dir + '/' + Module.config.descriptorFile;
    getFileInformation(file).then(function (stats) {
      if (stats.isFile()) {
        try {
          var module = require(file);
          if (typeof module.default === 'undefined') {
            throw new Error('require ' + file + ' must return an object with default.');
          }
          resolve(module.default);
        } catch (e) {
          reject(e);
        }
      } else {
        return null;
      }
    });
  });
};

var Module = function () {
  function Module() {
    _classCallCheck(this, Module);
  }

  _createClass(Module, null, [{
    key: 'add',
    value: function add(module) {
      this[module.getName()] = module;
    }
  }, {
    key: 'has',
    value: function has(name) {
      return typeof this[name] !== 'undefined';
    }
  }, {
    key: 'remove',
    value: function remove(name) {
      if (this.has(name)) {
        delete this[name];
      }
    }
  }, {
    key: 'clean',
    value: function clean() {
      _class2.default.cleanProperties(this, ['config']);
    }
  }, {
    key: 'names',
    value: function names() {
      return Object.keys(this);
    }
  }, {
    key: 'all',
    value: function all() {
      return this.names().map(function (v) {
        return Module[v];
      });
    }
  }, {
    key: 'scan',
    value: function scan(dir, only) {
      dir = typeof dir === 'undefined' || dir === null ? this.config.basePath : dir;
      only = typeof only === 'undefined' ? [] : only;
      var files = [];
      return scanForFiles(dir, only).then(function (files) {
        files = files.map(function (v) {
          return _path2.default.join(dir, v);
        });
        return scanForDirectories(files);
      }).then(function (dirs) {
        var promises = [];
        dirs.forEach(function (dir) {
          promises.push(requireModuleDescriptor(dir));
        });

        return Promise.all(promises).then(function (modules) {
          modules.forEach(function (module) {
            Module.add(module);
          });
          return Module.all();
        });
      });
    }
  }]);

  return Module;
}();

exports.default = Module;

_class2.default.definePropertyNotEnumerable(Module, 'config', {
  basePath: _path2.default.join(process.env.PWD),
  descriptorFile: 'descriptor.js'
});