const assert = require("assert")

/**
 * Support to manipulate collection of items
 */
export default class Collection {
  /**
   * Constructor
   * @param {?Array} [items=[]] Initial items to be placed in collection
   */
  constructor(items = []) {
    /**
     * @access protected
     * @type {Array}
     */
    this.items = items
  }

  /**
   * Add an item to collection
   *
   * @param {*} item Add an item to collection, it should have any type as possible
   * @returns {Collection}
   */
  add(item) {
    this.items.push(item)
    return this
  }

  /**
   * Remove an item (or index) from collection
   *
   * @param {number|Object} item Item to be removed
   */
  remove(item) {
    switch (typeof item) {
      case "number":
        this.items.splice(item, 1)
        break

      case "object":
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
   * @param {*} item Item to check
   * @returns {boolean}
   */
  has(item) {
    if (this.items.length) {
      for (let i = 0; i < this.items.length; i++) {
        switch (typeof item) {
          case "object":
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
   * @see {Collection#add}
   * @param {*} item
   */
  push(item) {
    this.add(item)
  }

  /**
   * Return last item of collection
   *
   * @returns {*}
   */
  pop() {
    return this.items.pop()
  }

  /**
   * Find items by query
   *
   * @param {{}} query
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
        if (typeof item[key] === "undefined" || query[key] !== item[key]) {
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
   * @param {number} index
   * @param {?*} [def=null] Default result if item could not be found
   * @returns {*}
   */
  get(index, def = null) {
    return typeof this.items[index] === "undefined" ? def : this.items[index]
  }

  /**
   * Replace all current items
   * @param {Array} [items=[]]
   */
  replace(items = []) {
    this.items = items
  }

  /**
   * Get all items in collection
   * @returns {Array}
   */
  all() {
    return this.items
  }

  /**
   * Loop through data with a callback
   * @param {function} callback A callback function to handle item,
   *                            it would receive 2 parameters (key, value) as the input
   * @param {?Object} target An object to become "this argument" (receiver) of the callback
   */
  forEach(callback, target) {
    this.items.forEach((item) => {
      if (typeof target === "undefined") {
        callback(item)
      } else {
        callback.apply(target, [item])
      }
    })
  }
}
