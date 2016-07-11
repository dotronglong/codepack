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
    const uriString = `${Uri.SCHEME_HTTP}://${resource.headers[Message.HEADER_HOST]}${resource.url}`
    let request = new Request(resource.method, Uri.from(uriString), null, null, resource.headers)
    let getRequestBody = new Promise((resolve, reject) => {
      let body = []
      resource.on('error', (err) => {
        reject(err)
      }).on('data', (chunk) => {
        body.push(chunk)
      }).on('end', () => {
        body = Buffer.concat(body).toString()
        resolve(body)
      })
    })
    getRequestBody.then((body) => {
      request.content = body
    })

    return request
  }
}