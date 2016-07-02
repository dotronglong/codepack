import Class from './class';
import ModuleDescriptor from './module/descriptor';
import fs from 'fs';
import path from 'path';

const NOT_IN_ARRAY = -1;
let basePath = '';
let scanForFiles = (dir, only) => {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      let validFiles = [];
      files.forEach((file) => {
        // make sure file does not contain "." at the beginning,
        // and if only is enabled, only require files are returned
        if (file.match(/^\./) || (only.length && only.indexOf(file) === NOT_IN_ARRAY)) {
          return;
        }
        validFiles.push(file);
      });
      resolve(validFiles);
    });
  });
};

let scanForDirectories = (files) => {
  return new Promise((resolve, reject) => {
    let promises = [];
    files.forEach((file) => {
      promises.push(getFileInformation(file).then(stats => {
        if (stats.isDirectory()) {
          return file;
        }
        return null;
      }));
    });
    let directories = [];
    Promise.all(promises).then(files => {
      files.forEach((file) => {
        if (file !== null) {
          directories.push(file);
        }
      });
      resolve(directories);
    });
  });
};

let getFileInformation = (file) => {
  return new Promise((resolve, reject) => {
    fs.stat(file, (err, stats) => {
      resolve(stats);
    });
  });
};

let requireModuleDescriptor = (dir) => {
  return new Promise((resolve, reject) => {
    const file = `${dir}/${Module.config.descriptorFile}`;
    getFileInformation(file)
      .then((stats) => {
        if (stats.isFile()) {
          try {
            let module = require(file)
            if (typeof module.default === 'undefined') {
              throw new Error(`require ${file} must return an object with default.`);
            }
            resolve(module.default)
          } catch (e) {
            reject(e)
          }
        } else {
          return null;
        }
      });
  });
};

export default class Module {
  static add(module) {
    this[module.getName()] = module;
  }

  static has(name) {
    return typeof this[name] !== 'undefined';
  }

  static remove(name) {
    if (this.has(name)) {
      delete this[name];
    }
  }

  static clean() {
    Class.cleanProperties(this, ['config']);
  }

  static scan(dir, only) {
    dir = typeof dir === 'undefined' || dir === null ? this.config.basePath : dir;
    only = typeof only === 'undefined' ? [] : only;
    return new Promise((resolve, reject) => {
      let files = [];
      scanForFiles(dir, only)
        .then((files) => {
          files = files.map(v => path.join(dir, v));
          return scanForDirectories(files)
        })
        .then((dirs) => {
          let promises = [];
          dirs.forEach((dir) => {
            promises.push(requireModuleDescriptor(dir)
              .then((module) => {
                return module
              }));
          });
          Promise.all(promises).then((modules) => {
            modules.forEach((module) => {
              Module.add(module);
            });
            resolve(modules)
          }).catch((e) => {console.log(e)
            reject(e)
          });
        });
    });
  }
}
Object.defineProperty(Module, 'config', {
  enumerable: false,
  value: {
    basePath: path.join(process.env.PWD),
    descriptorFile: 'descriptor.js'
  }
});