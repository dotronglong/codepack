import Message from './message'
import Uri from './uri'

export default class Request extends Message {
  constructor(method, uri) {
    super()
    this.method = typeof method === 'undefined' ? Request.METHOD_GET : method
    this.uri    = typeof uri === 'undefined' ? null : uri
  }

  get query() {
    return this.uri.query
  }

  set query(query) {
    this.uri.query = query
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
          try {
            request.body = Buffer.concat(body).toString()
            resolve(request)
          } catch (e) {
            reject(e)
          }
        })
      } catch (e) {
        reject(e)
      }
    })
  }
}
Request.METHOD_GET    = 'GET'
Request.METHOD_POST   = 'POST'
Request.METHOD_PUT    = 'PUT'
Request.METHOD_PATCH  = 'PATCH'
Request.METHOD_DELETE = 'DELETE'
Request.METHOD_HEAD   = 'HEAD'
Request.METHOD_OPTION = 'OPTION'