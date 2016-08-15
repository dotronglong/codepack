import {Message} from './message'

/**
 * Http Response
 */
export default class Response extends Message {
  /**
   * Constructor
   * @param {?Object} [headers={}] Initial headers
   * @param {?string} [body=''] Response's body content
   * @param {?number} [statusCode=200] Response's status code, default is OK
   */
  constructor(headers = {}, body, statusCode = Response.HTTP_OK) {
    super(headers, body)

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
   * @param {?string} content Message body content
   * @param {?number} statusCode Response's status code
   * @param {?Object} headers Response's headers
   */
  send(content, statusCode, headers) {
    this.body.content = content
    this.statusCode   = statusCode || this.statusCode
    this.headers      = headers || this.headers

    for (let [key, value] of this.headers) {
      this.resource.setHeader(key, value)
    }

    this.resource.statusCode = this.statusCode
    this.resource.end(this.body.toString())
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
