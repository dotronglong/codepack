import Message from './message'
import Bag from '../bag'
import Uri from './uri'
import cli from '../cli'

export default class Request extends Message {
  constructor(method, uri, params, content, headers) {
    super(content, headers)
    this.method = method
    this.uri    = uri
    this.params = new Bag(params)
  }

  static from(resource) {
    let request = new Request()
    request.method = resource.method
    request.uri = Uri.from(`${Uri.SCHEME_HTTP}://${resource.headers[Message.HEADER_HOST]}${resource.url}`)
    request.headers = resource.headers

    let body = []
    resource.on('error', (err) => {
      cli.error(err)
    }).on('data', (chunk) => {
      body.push(chunk)
    }).on('end', () => {
      request.body = Buffer.concat(body).toString()
      console.log(request)
    })
    
    return request
  }
}