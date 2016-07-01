import ModuleDescriptor from './module/descriptor';
import fs from 'fs';
import path from 'path';

const TYPE_DIR  = 'dir';
const TYPE_FILE = 'file';

let scanForFiles = (dir) => {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      let validFiles = [];
      files.forEach((file) => {
        // make sure file does not contain "." at the beginning
        if (file.match(/^\./)) {
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
    let files = [];
    scanForFiles(dir)
      .then((files) => {
        return scanForDirectories(files)
      })
      .then((dirs) => {
        console.log(dirs);
      });
  }
}