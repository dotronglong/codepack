import Bag from '../../bag'
import Request from '../request'

export default class Fetcher extends Bag {
  /**
   * Constructor
   * @param {Request} request
   * @param {?Object} [rules={}]
   */
  constructor(request, rules = {}) {
    super()
    this._request = request
    this._rules = new Bag(rules)
  }

  addRule(name, rule) {
    if (this.has(name)) {
      this.set(name, Object.assign(this.get(name), rule))
    } else {
      this.set(name, rule)
    }
  }

  removeRule(name, rule) {
    if (this.has(name)) {
      let item = this.get(name)
      delete item[rule]
      this.set(name, item)
    }
  }

  require(name) {
    this.addRule(name, { require: true })
  }

  allowNull(name) {
    this.addRule(name, { null: true })
  }

  allowEmpty(name) {
    this.addRule(name, { empty: true })
  }
}