import Body from './body'
import Message from './message'

/**
 * HTTP Response
 */
export default class Response extends Message {
  /**
   * Constructor
   * @param {?string} [content=''] Response's body content
   * @param {?number} [statusCode=200] Response's status code, default is OK
   * @param {?Object} [header={}] Initial headers
   */
  constructor(content = '', statusCode = Response.HTTP_OK, header = {}) {
    super()

    this.setBody(new Body(content))
    this.setHeader(header)

    /**
     * Response's status code
     * @type {number}
     */
    this.statusCode = statusCode

    /**
     * Response's status message
     * @type {string}
     */
    this.statusMessage = null
  }

  /**
   * Send response to client
   */
  send() {
    for (let [key, value] of this.getHeader()) {
      this.getResource().setHeader(key, value)
    }

    this.getResource().statusCode    = this.statusCode
    this.getResource().statusMessage = this.statusMessage
    this.getResource().end(this.getBody().toString())
  }
}
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
