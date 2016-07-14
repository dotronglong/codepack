import Bag from '../bag'
import Message from './message'

export default class Request extends Message {
  constructor() {
    super()
    this.server = {}
    this.remote = {}
    this.method = Request.METHOD_GET
    this.query  = new Bag()
  }
}
Request.METHOD_GET    = 'GET'
Request.METHOD_POST   = 'POST'
Request.METHOD_PUT    = 'PUT'
Request.METHOD_PATCH  = 'PATCH'
Request.METHOD_DELETE = 'DELETE'
Request.METHOD_HEAD   = 'HEAD'
Request.METHOD_OPTION = 'OPTION'