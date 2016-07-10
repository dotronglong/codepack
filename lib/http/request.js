import Message from './message'
import Bag from '../bag'

export default class Request extends Message {
  constructor(method, uri, query, params, body, headers) {
    super(body, headers)
    this.method = method
    this.uri    = uri
    this.query  = new Bag(query)
    this.params = new Bag(params)
  }
}