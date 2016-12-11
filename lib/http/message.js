import Body from './body'
import Header from './header'

/**
 * HTTP Message
 */
export default class Message {
  /**
   * Constructor
   */
  constructor() {
    this.setBody(new Body())
    this.setHeader(new Header())
  }

  /**
   * Get message's body
   * @returns {Body}
   */
  getBody() {
    return this._body
  }

  /**
   * Set message's body
   * @param {Body} body
   */
  setBody(body) {
    if (body instanceof Body) {
      this._body = body
    }else {
      throw new Error('The message\'s body must be either an instance of Body.')
    }
  }

  /**
   * Get message's header
   * @returns {Header}
   */
  getHeader() {
    return this._header
  }

  /**
   * Set message's header
   * @param {Bag|Object} header
   */
  setHeader(header) {
    if (header instanceof Header) {
      this._header = header
    } else if (typeof header === 'object') {
      this._header = new Header(header)
    } else {
      throw new Error('The message\'s header must be an instance of Header or an object.')
    }
  }

  /**
   * Get original resource
   * @returns {*}
   */
  getResource() {
    return this._resource
  }

  /**
   * Set original resource
   * @param {*} resource
   */
  setResource(resource) {
    this._resource = resource
  }
}