import Bag from '../bag'
import Message from './message'
var url = require('url')

let parseQueryString = (string) => {
  let query = {}
  let args  = string.match(/(&|^)([\w|\-]+=[\w|\-]+)/gi)
  args.forEach((arg) => {
    if (arg[0] === '&') {
      arg = arg.substr(1)
    }
    let v = arg.split('=')
    if (v.length === 2) {
      query[v[0]] = v[1]
    }
  })
  return query
}

export default class Request extends Message {
  constructor() {
    super()
    this.server = {}
    this.remote = {}
    this.method = Request.METHOD_GET
    this.query  = new Bag()
  }

  get query() {
    return this._query
  }

  set query(query) {
    if (typeof query === 'string') {
      this._query = new Bag(parseQueryString(query))
    } else if (typeof query === 'object') {
      if (query instanceof Bag) {
        this._query = query
      } else {
        this._query = new Bag(query)
      }
    }
  }
}
Request.METHOD_GET    = 'GET'
Request.METHOD_POST   = 'POST'
Request.METHOD_PUT    = 'PUT'
Request.METHOD_PATCH  = 'PATCH'
Request.METHOD_DELETE = 'DELETE'
Request.METHOD_HEAD   = 'HEAD'
Request.METHOD_OPTION = 'OPTION'