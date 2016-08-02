const assert = require('assert')

export default class Collection {
  constructor(items = []) {
    this.items = items
  }
  
  add(item) {
    this.item.push(item)
  }
  
  remove(item) {
    switch (typeof item) {
      case 'number':
        this.item.splice(item, 1)
        break

      case 'object':
      default:
        try {

        } catch (e) {

        }
        break
    }
  }
}