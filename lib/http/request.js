import Message from './message'
import Bag from '../bag'
import Uri from './uri'

export default class Request extends Message {
  constructor(method, uri, params, content, headers) {
    super(content, headers)
    this.method = method
    this.uri    = uri
    this.params = new Bag(params)
  }

  static from(resource) {
    console.log(resource)
    // const uriString = `${resource.headers[Message.HEADER_HOST]}${resource.url}`
    // let request = new Request(resource.method, Uri.from(uriString), null, null, resource.headers)
    // console.log(request)
  }
}