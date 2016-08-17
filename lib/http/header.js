import Bag from "../bag"
import Str from "../str"

/**
 * Contain headers as a bag, easy to manipulate
 */
export default class Header extends Bag {
  /**
   * Return all keys
   * @returns {Array}
   */
  get keys() {
    let keys = []
    for (let key of Object.keys(this._data)) {
      keys.push(Str.upperCaseFirst(key, "-"))
    }
    return keys
  }

  /**
   * Define whether or not a header key exist
   * @param {!string} key A string represents for header name, it is case-insensitive
   * @returns {boolean}
   */
  has(key) {
    return super.has(key.toLowerCase())
  }

  /**
   * Get value of a header by key
   * @param {!string} key Name of header to retrieve
   * @param {?string} [def=null] Default value to return in case there is no headers valid
   * @returns {string}
   */
  get(key, def = null) {
    return super.get(key.toLowerCase(), def)
  }

  /**
   * Set a header (key-value)
   * @param {!string} key
   * @param {!string} value
   */
  set(key, value) {
    super.set(key.toLowerCase(), value)
  }

  /**
   * Remove a header by key
   * @param {!string} key
   */
  delete(key) {
    super.delete(key.toLowerCase())
  }

  /**
   * Replace current headers with new ones
   * @param {?{}} [data={}]
   */
  replace(data = {}) {
    let _data = {}
    Object.keys(data).forEach((key) => {
      _data[key.toLowerCase()] = data[key]
    })
    super.replace(_data)
  }
}
Header.CONTENT_TYPE = "content-type"
