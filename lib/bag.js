function iterator(keys, values) {
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
  }

  size() {
    return this.length
  }

  get length() {
    return this.keys.length
  }

  get keys() {
    return Object.keys(this.data)
  }

  get values() {
    let values = []
    this.keys.forEach(key => values.push(this.data[key]))
    return values
  }

  replace(data = {}) {
    this.data = Object.assign({}, data)
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

  forEach(callback, target) {
    this.keys.forEach((key) => {
      if (typeof target === 'undefined') {
        callback(key, this.data[key])
      } else {
        callback.apply(target, [key, this.data[key]])
      }
    })
  }

  all() {
    return this.data
  }

  only(keys) {
    let values = {};
    keys.forEach((key) => values[key] = this.data[key])
    return values;
  }

  clear() {
    this.data = {}
  }

  toString(keys = null, delimiter = '&') {
    let data = this.data
    if (Array.isArray(keys)) {
      data = this.only(keys)
    }

    let string = ''
    Object.keys(data).forEach((k) => {
      string += (string === '' ? '' : delimiter) + `${k}=${data[k]}`
    })
    return string
  }

  [Symbol.iterator]() {
    return iterator(this.keys, this.values)
  }
}
