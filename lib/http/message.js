import Header from './header'
import Bag from '../bag'

/**
 * Body of message
 * @access public
 */
export class Body {
  /**
   * constructor
   * @param {?string} content Content of message's body
   * @param {?string} [type="application/json"] Body's content type
   */
  constructor(content, type = Message.CONTENT_JSON) {
    this.content = content
    this.type    = type

    this.rawContent    = ''
    this.parsedContent = {}
  }

  /**
   * Return body as a string
   * @returns {string}
   */
  toString() {
    return this.rawContent
  }

  /**
   * @type {object}
   */
  get content() {
    return this.parsedContent
  }

  /**
   * @param {*} content Content of body to be set
   */
  set content(content) {
    if (typeof content === 'undefined') {
      return
    }

    switch (this.type) {
      case Message.CONTENT_JSON:
        this.handleContentJson(content)
        break
      default:
        throw new Error('Invalid Body Content Type')
        break
    }
  }

  /**
   * Handle JSON Content
   * @access protected
   * @param {*} content Body content
   */
  handleContentJson(content) {
    const contentType = typeof content
    switch (contentType) {
      case 'object':
        this.parsedContent = content
        this.rawContent    = JSON.stringify(content)
        break
      case 'string':
        if (content === '') {
          this.parsedContent = {}
        } else {
          this.parsedContent = JSON.parse(content)
        }
        this.rawContent = content
        break
      case 'function':
        this.handleContentJson(content())
        break
      default:
        break
    }
  }
}

/**
 * Message
 */
export class Message {
  /**
   * Constructor
   * @param {?{}} headers Message's headers
   * @param {?*} body Message's body
   */
  constructor(headers, body) {
    /**
     * @type {Header}
     */
    this.headers  = headers

    /**
     * @type {Body}
     */
    this.body     = body

    this.resource = null
  }

  /**
   * @type {string}
   */
  get type() {
    return this.headers.get(Message.HEADER_CONTENT_TYPE, Message.CONTENT_JSON)
  }

  /**
   * @type {Header}
   */
  get headers() {
    return this._headers
  }

  /**
   * @param {{}} headers
   */
  set headers(headers) {
    if (typeof headers === 'undefined') {
      headers = {}
    }
    if (typeof headers === 'object' && headers instanceof Bag) {
      headers = headers.all()
    }

    this._headers = new Header(headers)
  }

  /**
   * @type {Body}
   */
  get body() {
    return this._body
  }

  /**
   * @param {?*} body
   */
  set body(body) {
    if (typeof body === 'undefined') {
      return
    }

    this._body = body
  }

  /**
   * Add an event listener to original resource object
   * @param {!string} event Name of the event
   * @param {!function} callback Callback function to the event
   */
  on(event, callback) {
    if (this.resource !== null) {
      this.resource.on(event, callback)
    }
  }
}

Message.HEADER_CONTENT_TYPE = 'Content-Type'
Message.HEADER_USER_AGENT   = 'User-Agent'
Message.HEADER_HOST         = 'Host'

Message.CONTENT_XML  = 'text/xml'
Message.CONTENT_HTML = 'text/html'
Message.CONTENT_TEXT = 'text/plain'
Message.CONTENT_JSON = 'application/json'
