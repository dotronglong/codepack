const assert = require('assert')

export default class Collection {
  constructor(items = []) {
    this.items = items
  }

  /**
   * Add an item to collection
   *
   * @param {*} item
   * @returns Collection
   */
  add(item) {
    this.items.push(item)
    return this
  }

  /**
   * Remove an item (or index) from collection
   *
   * @param {Number|Object} item
   */
  remove(item) {
    switch (typeof item) {
      case 'number':
        this.items.splice(item, 1)
        break

      case 'object':
      default:
        for (let i = 0; i < this.items.length; i++) {
          try {
            assert.deepEqual(item, this.items[i])
            this.remove(i)
          } catch (e) {
            // do nothing
          }
        }
        break
    }
  }

  /**
   * Check whether or not an item exists in collection
   *
   * @param {*} item
   * @returns {boolean}
   */
  has(item) {
    if (this.items.length) {
      for (let i = 0; i < this.items.length; i++) {
        switch (typeof item) {
          case 'object':
            try {
              assert.deepEqual(item, this.items[i])
              return true
            } catch (e) {
              // do nothing
            }
            break
          default:
            if (item === this.items[i]) {
              return true
            }
            break
        }
      }
    }

    return false
  }

  /**
   * Add an item to collection
   *
   * @see Collection.add
   * @param {*} item
   */
  push(item) {
    this.add(item)
  }

  /**
   * Return last item of collection
   *
   * @returns {T}
   */
  pop() {
    return this.items.pop()
  }

  /**
   * Find items by query
   *
   * @param {Object} query
   * @returns {Collection|null}
   */
  find(query) {
    const keys = Object.keys(query)
    if (keys.length === 0) {
      return null
    }

    let items = new Collection()
    this.items.forEach((item) => {
      let isMatched = true
      for (let i = 0; i < keys.length; i++) {
        let key = keys[i]
        if (typeof item[key] === 'undefined' || query[key] !== item[key]) {
          isMatched = false
          break
        }
      }
      if (isMatched) {
        items.add(item)
      }
    })
    return items
  }

  /**
   * Get an item by index
   *
   * @param {Number} index
   * @param {*} def Default result if item could not be found
   * @returns {*}
   */
  get(index, def = null) {
    return typeof this.items[index] === 'undefined' ? def : this.items[index]
  }
  
  all() {
    return this.items
  }
}