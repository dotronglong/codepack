import {Class} from './class';

export class Singleton {
  static getInstance() {
    if (typeof this.instance === 'undefined') {
      this.instance = this.newInstance();
      Class.setInstanceof(this.instance, this.name);
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