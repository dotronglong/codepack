export class Module {
  static load(name) {

  }

  static register(name, module) {
    this.modules[name] = module;
  }

  static setPath(path) {
    this.path = path;
  }

  static getPath() {
    return this.path;
  }
}