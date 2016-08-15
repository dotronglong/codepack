function copy(...args) {
  return Object.assign({}, ...args)
}

function keys(source) {
  return Object.keys(source)
}

function values(source) {
  let values = []
  keys(source).forEach(key => values.push(source[key]))
  return values
}

function iterator() {
  let _keys, _values
  if (this instanceof Bag) {
    _keys = this.keys, _values = this.values
  } else {
    _keys = keys(this), _values = values(this)
  }
  this[Symbol.iterator] = () => {
    return loop(_keys, _values)
  }
  return this
}

function loop(keys, values) {
  const length = keys.length
  let position = 0

  return {
    next: () => {
      return position < length ? {
        value: [keys[position], values[position++]],
        done: false
      } : {done: true}
    }
  }
}

/**
 * An alternative for Map to handle key-value data
 */
export default class Bag {
  /**
   * @param {?{}} [data={}] Initial object data
   */
  constructor(data = {}) {
    this.replace(data)
    iterator.apply(this)
  }

  /**
   * Return size (total items)
   * @returns {number}
   */
  size() {
    return this.length
  }

  /**
   * Return total items
   * @returns {number}
   */
  get length() {
    return this.keys.length
  }

  /**
   * Return all keys in Bag
   * @returns {Array}
   */
  get keys() {
    return keys(this._data)
  }

  /**
   * Return all values in Bag
   * @returns {Array}
   */
  get values() {
    return values(this._data)
  }

  /**
   * Replace the current data with new one
   * @param {?{}} [data={}] Data to replace
   */
  replace(data = {}) {
    this._data = copy(data)
  }

  /**
   * Determine whether or not a key exists in Bag
   * @param {!string} key
   * @returns {boolean}
   */
  has(key) {
    return !(typeof this._data[key] === 'undefined')
  }

  /**
   * Get value of a pre-defined key
   * @param {!string} key
   * @param {?*} [def=null] Default value to return if key does not exist
   * @returns {*}
   */
  get(key, def = null) {
    return this.has(key) ? this._data[key] : def
  }

  /**
   * Set a key-value pair
   * @param {!string} key
   * @param {!*} value
   */
  set(key, value) {
    this._data[key] = value
  }

  /**
   * Remove a value by key
   * @param {!string} key
   */
  delete(key) {
    delete this._data[key]
  }

  /**
   * Return a cloned version of Bag data
   * @returns {{}}
   */
  all() {
    return copy(this._data)
  }

  /**
   * Get key-value pairs only for proposed keys
   * @param {!Array} keys An array of keys to get their's values
   * @returns {{}}
   */
  only(keys) {
    let items = {}
    keys.forEach(key => items[key] = this._data[key])
    return items
  }

  /**
   * Clear all data
   */
  clear() {
    this._data = {}
  }

  /**
   * Combine all key-value pairs into string with a proposed delimiter
   * @param {?Array} [keys=null] (Optional) only render key-value pairs which has key in this pre-defined keys
   * @param {?string} [delimiter='&'] Conjunction of string to connect key-value pairs
   * @returns {string}
   */
  toString(keys = null, delimiter = '&') {
    let data = [], string = ''

    if (Array.isArray(keys)) {
      data = this.only(keys)
    } else {
      data = copy(this._data)
    }

    Object.keys(data).forEach((key) => {
      string += (string === '' ? '' : delimiter) + `${key}=${data[key]}`
    })
    return string
  }

  /**
   * Loop through data with a callback
   * @param {function} callback A callback function to handle item,
   *                            it would receive 2 parameters (key, value) as the input
   * @param {?Object} target An object to become "this argument" (receiver) of the callback
   */
  forEach(callback, target) {
    this.keys.forEach((key) => {
      if (typeof target === 'undefined') {
        callback(key, this._data[key])
      } else {
        callback.apply(target, [key, this._data[key]])
      }
    })
  }

  /**
   * Return an iterator to be looped through data of Bag
   * @param {?Array} keys (Optional) Only allow to loop pre-defined keys
   * @returns {function} Iterator function to be used as for..of
   */
  entries(keys) {
    return iterator.apply(typeof keys === 'undefined' ? this : this.only(keys))
  }
}
