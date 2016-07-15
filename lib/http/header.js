import Bag from '../bag'

export default class Header extends Bag {
  constructor(data) {
    super(data)
  }

  has(key) {
    return super.has(key.toLowerCase())
  }

  get(key, def = null) {
    return super.get(key.toLowerCase(), def)
  }

  set(key, value) {
    super.set(key.toLowerCase(), value)
  }

  remove(key) {
    super.remove(key.toLowerCase())
  }

  replace(data = {}) {
    this.data = {}
    Object.keys(data).forEach(k => this.set(k.toLowerCase(), data[k]))
  }
}