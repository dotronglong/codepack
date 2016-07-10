import Bag from './bag'
var http = require('http')

export default class Server {
  constructor(options = {}) {
    this.options = new Bag(options)
  }
}