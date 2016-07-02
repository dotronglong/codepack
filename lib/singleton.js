import Class from './class';

export default class Singleton {
  static getInstance() {
    if (typeof this.instance === 'undefined') {
      this.instance = this.newInstance();
      Class.setInstanceof(this.instance, this);
    }

    return this.instance;
  }

  static setInstance(instance) {
    this.instance = instance;
  }

  static newInstance() {
    return new this;
  }
}