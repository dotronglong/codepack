import Message from './message'

export default class Response extends Message {
  constructor(headers = {}, body = '', statusCode = Response.HTTP_OK) {
    super(headers, body)
    this.statusCode = statusCode
  }

  type(type) {
    this.headers.set(Message.HEADER_CONTENT_TYPE, type)
  }

  send(content) {
    if (typeof content !== 'undefined') {
      this.body.content = content
    }

    let headers = this.headers.all()
    Object.keys(headers).forEach((key) => {
      this.resource.setHeader(key, headers[key])
    })

    this.resource.statusCode = this.statusCode
    this.resource.end(this.body.toString())
  }

  static from(resource) {
    return new Promise((resolve, reject) => {
      try {
        let response      = new Response()
        response.resource = resource
        response.type(Response.DEFAULT_CONTENT_TYPE)
        resolve(response)
      } catch (e) {
        reject(e)
      }
    })
  }
}
Response.DEFAULT_CONTENT_TYPE     = Response.CONTENT_JSON
Response.HTTP_OK                  = 200
Response.HTTP_CREATED             = 201
Response.HTTP_ACCEPTED            = 202
Response.HTTP_NO_CONTENT          = 204
Response.HTTP_RESET_CONTENT       = 205
Response.HTTP_MOVED_PERMANENTLY   = 301
Response.HTTP_FOUND               = 302
Response.HTTP_NOT_MODIFIED        = 304
Response.HTTP_BAD_REQUEST         = 400
Response.HTTP_UNAUTHORIZED        = 401
Response.HTTP_FORBIDDEN           = 403
Response.HTTP_NOT_FOUND           = 404
Response.HTTP_METHOD_NOT_ALLOWED  = 404
Response.HTTP_REQUEST_TIMEOUT     = 408
Response.HTTP_TOO_MANY_REQUESTS   = 429
Response.HTTP_INTERNAL_ERROR      = 500
Response.HTTP_NOT_IMPLEMENTED     = 501
Response.HTTP_BAD_GATEWAY         = 502
Response.HTTP_SERVICE_UNAVAILABLE = 503
Response.HTTP_GATEWAY_TIMEOUT     = 504