import Message from './message'
import Bag from '../bag'
import Uri from './uri'
import cli from '../cli'

export default class Request extends Message {
  constructor(method, uri, params, content, headers) {
    super(content, headers)
    this.method   = method
    this.uri      = uri
    this.resource = null
  }

  static from(resource) {
    return new Promise((resolve, reject) => {
      try {
        let request      = new Request()
        request.resource = resource
        request.method   = resource.method
        request.uri      = Uri.from(`${Uri.SCHEME_HTTP}://${resource.headers[Message.HEADER_HOST]}${resource.url}`)
        request.headers  = resource.headers

        let body = []
        resource.on('error', (e) => {
          reject(e)
        }).on('data', (chunk) => {
          body.push(chunk)
        }).on('end', () => {
          request.body = Buffer.concat(body).toString()
          resolve(request)
        })
      } catch (e) {
        reject(e)
      }
    })
  }
}