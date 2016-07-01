export default class Bag {
  constructor(data) {
    this.replace(data)
  }

  replace(data = {}) {
    this.data = Object.assign({}, data);
  }

  has(key) {
    return typeof this.data[key] !== 'undefined'
  }

  get(key, def = null) {
    return this.has(key) ? this.data[key] : def
  }

  set(key, value) {
    this.data[key] = value
  }

  remove(key) {
    delete this.data[key]
  }

  all() {
    return this.data
  }

  only(keys) {
    let values = {};
    keys.forEach((key) => {
      values[key] = this.get(key)
    })
    return values;
  }

  clean() {
    this.data = {}
  }
}