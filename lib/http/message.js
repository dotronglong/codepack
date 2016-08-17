import Header from "./header"
import Bag from "../bag"

/**
 * Body of message
 */
export class Body {
  /**
   * Constructor
   * @param {?string} [content='{}'] Content of message's body
   * @param {?string} [type="application/json"] Body's content type
   */
  constructor(content, type = Message.CONTENT_JSON) {
    /**
     * Body content, it might be a string or an object.
     * When retrieving, it always be a parsed type, for instance, object, Bag.
     * When setting, it could be an object or a string
     * @type {*}
     */
    this.content = content

    /**
     * Type of body, it relies on http header 'Content-Type'
     * @type {string}
     */
    this.type = type

    /**
     * Raw content of body
     * @access protected
     * @type {string}
     */
    this.rawContent = ""

    /**
     * Parsed content of body, it's type depends on the body's type
     * @access protected
     * @type {Object|Bag}
     */
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
   * @returns {Object}
   */
  get content() {
    return this.parsedContent
  }

  /**
   * @param {string} content Content of body to be set
   */
  set content(content) {
    if (content === undefined) {
      return
    }
    switch (this.type) {
      case Message.CONTENT_JSON:
        this.handleContentJson(content)
        break
      default:
        throw new Error("Invalid Body Content Type")
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
      case "object":
        this.parsedContent = new Bag(content)
        this.rawContent    = JSON.stringify(content)
        break
      case "string":
        if (content === "") {
          this.parsedContent = new Bag()
        } else {
          this.parsedContent = new Bag(JSON.parse(content))
        }
        this.rawContent = content
        break
      case "function":
        this.handleContentJson(content())
        break
      default:
        break
    }
  }
}

/**
 * Http Message
 */
export class Message {
  /**
   * Constructor
   * @param {?{}} headers Message's headers
   * @param {?*} body Message's body
   */
  constructor(headers, body) {
    /**
     * Message's headers
     * @type {Header}
     */
    this.headers = headers

    /**
     * Message's body for some special request method, such as POST and PUT
     * @type {Body}
     */
    this.body = body

    /**
     * Original resource
     * @access protected
     * @type {Object}
     */
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
   * @param {Object} headers
   */
  set headers(headers) {
    if (typeof headers === "undefined") {
      headers = {}
    }
    if (typeof headers === "object" && headers instanceof Bag) {
      headers = headers.all()
    }

    this._headers = new Header(headers)
  }

  /**
   * @returns {Body}
   */
  get body() {
    return this._body
  }

  /**
   * @param {?string|Body} body
   */
  set body(body) {
    if (body instanceof Body) {
      this._body = body
    } else if (typeof body === "string") {
      this._body = new Body(body)
    } else {
      this._body = new Body()
    }
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
Message.HEADER_CONTENT_TYPE = "Content-Type"
Message.HEADER_USER_AGENT   = "User-Agent"
Message.HEADER_HOST         = "Host"

Message.CONTENT_XML  = "text/xml"
Message.CONTENT_HTML = "text/html"
Message.CONTENT_TEXT = "text/plain"
Message.CONTENT_JSON = "application/json"
