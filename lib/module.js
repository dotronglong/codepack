import ModuleDescriptor from './module/descriptor';
import fs from 'fs';
import path from 'path';

const NOT_IN_ARRAY = -1;

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

let requireModuleDescriptor = (moduleName) => {
  return new Promise((resolve, reject) => {
    const file = `${moduleName}/descriptor.js`;
    getFileInformation(file)
      .then((stats) => {
        if (stats.isFile()) {
          resolve(require(path.join(Module.config.basePath, file)))
        } else {
          return null;
        }
      });
  });
};

export default class Module {
  static add(module) {
    if (module instanceof ModuleDescriptor) {
      this[module.getName()] = module;
    } else {
      throw new Error('module MUST be an instance of ModuleDescriptor');
    }
  }

  static has(name) {
    return typeof this[name] !== 'undefined';
  }

  static remove(name) {
    if (this.has(name)) {
      delete this[name];
    }
  }

  static scan(dir, only) {
    return new Promise((resolve, reject) => {
      let files = [];
      scanForFiles(dir, only)
        .then((files) => {
          return scanForDirectories(files)
        })
        .then((dirs) => {
          let promises = [];
          dirs.forEach((file) => {
            promises.push(requireModuleDescriptor(`${dir}/${file}`)
              .then((module) => {
                return module
              }));
          });
          Promise.all(promises).then((modules) => {
            modules.forEach((module) => {
              Module.add(module);
            });
            resolve(modules)
          });
        });
    });
  }
}
Module.config = {
  basePath: path.join(process.env.PWD)
};