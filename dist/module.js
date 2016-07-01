'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _descriptor = require('./module/descriptor');

var _descriptor2 = _interopRequireDefault(_descriptor);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NOT_IN_ARRAY = -1;

var scanForFiles = function scanForFiles(dir, only) {
  return new _promise2.default(function (resolve, reject) {
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
  return new _promise2.default(function (resolve, reject) {
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
    _promise2.default.all(promises).then(function (files) {
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
  return new _promise2.default(function (resolve, reject) {
    _fs2.default.stat(file, function (err, stats) {
      resolve(stats);
    });
  });
};

var requireModuleDescriptor = function requireModuleDescriptor(moduleName) {
  return new _promise2.default(function (resolve, reject) {
    var file = moduleName + '/descriptor.js';
    getFileInformation(file).then(function (stats) {
      if (stats.isFile()) {
        resolve(require(_path2.default.join(Module.config.basePath, file)));
      } else {
        return null;
      }
    });
  });
};

var Module = function () {
  function Module() {
    (0, _classCallCheck3.default)(this, Module);
  }

  (0, _createClass3.default)(Module, null, [{
    key: 'add',
    value: function add(module) {
      if (module instanceof _descriptor2.default) {
        this[module.getName()] = module;
      } else {
        throw new Error('module MUST be an instance of ModuleDescriptor');
      }
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
    key: 'scan',
    value: function scan(dir, only) {
      return new _promise2.default(function (resolve, reject) {
        var files = [];
        scanForFiles(dir, only).then(function (files) {
          return scanForDirectories(files);
        }).then(function (dirs) {
          var promises = [];
          dirs.forEach(function (file) {
            promises.push(requireModuleDescriptor(dir + '/' + file).then(function (module) {
              return module;
            }));
          });
          _promise2.default.all(promises).then(function (modules) {
            modules.forEach(function (module) {
              Module.add(module);
            });
            resolve(modules);
          });
        });
      });
    }
  }]);
  return Module;
}();

exports.default = Module;

Module.config = {
  basePath: _path2.default.join(process.env.PWD)
};