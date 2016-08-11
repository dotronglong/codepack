function copy(...args) {
  return Object.assign(...args)
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

export default class Bag {
  constructor(data) {
    this.replace(data)
    iterator.apply(this)
  }

  size() {
    return this.length
  }

  get length() {
    return this.keys.length
  }

  get keys() {
    return keys(this.data)
  }

  get values() {
    return values(this.data)
  }

  replace(data = {}) {
    this.data = copy({}, data)
  }

  has(key) {
    return !(typeof this.data[key] === 'undefined')
  }

  get(key, def = null) {
    return this.has(key) ? this.data[key] : def
  }

  set(key, value) {
    this.data[key] = value
  }

  delete(key) {
    delete this.data[key]
  }

  all() {
    return this.data
  }

  only(keys) {
    let items = {}
    keys.forEach(key => items[key] = this.data[key])
    return items
  }

  clear() {
    this.data = {}
  }

  toString(keys = null, delimiter = '&') {
    let data = [], string = ''

    if (Array.isArray(keys)) {
      data = this.only(keys)
    } else {
      data = copy({}, this.data)
    }

    Object.keys(data).forEach((k) => {
      string += (string === '' ? '' : delimiter) + `${k}=${data[k]}`
    })
    return string
  }

  forEach(callback, target) {
    this.keys.forEach((key) => {
      if (typeof target === 'undefined') {
        callback(key, this.data[key])
      } else {
        callback.apply(target, [key, this.data[key]])
      }
    })
  }

  entries(keys) {
    return iterator.apply(typeof keys === 'undefined' ? this : this.only(keys))
  }
}
