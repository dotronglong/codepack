import Bag from '../bag'

/**
 * HTTP Body
 */
export default class Body {
  /**
   * Constructor
   * @param {?string} [content=''] Content of message's body
   * @param {?string} [contentType='application/json'] Body's content type
   */
  constructor(content, contentType) {
    this.setContent(content)
    this.setContentType(contentType)
  }

  /**
   * Return body as a string
   * @returns {string}
   */
  toString() {
    return this.getContent()
  }

  /**
   * Body's content
   * @returns {string}
   */
  getContent() {
    return this._content
  }

  /**
   * Set body's content
   * @param {string} content
   */
  setContent(content = '') {
    this._content = content
    this._parsedContent = null
  }

  /**
   * Get parsed content
   * @returns {*|null}
   */
  getParsedContent() {
    if (this._parsedContent === null) {
      this._parsedContent = this._parseContent(this.getContent(), this.getContentType())
    }

    return this._parsedContent
  }

  /**
   * Set parsed content
   * @param {*} parsedContent
   */
  setParsedContent(parsedContent) {
    this._parsedContent = parsedContent
  }

  /**
   * Get Body's content type
   * @returns {string}
   */
  getContentType() {
    return this._contentType
  }

  /**
   * Set Body's content type
   * @param {string} contentType Default is JSON
   */
  setContentType(contentType = Body.DEFAULT_TYPE) {
    this._contentType = contentType
  }

  /**
   * Parse content by content's type
   * @param {*} content
   * @param {string} contentType
   * @returns {*}
   * @private
   */
  _parseContent(content, contentType) {
    let parsedContent
    switch(contentType) {
      case Body.CONTENT_JSON:
        parsedContent = this._parseContentJSON(content)
        break
      default:
        throw new Error('The body content\'s type is not supported.')
        break
    }

    return parsedContent
  }

  /**
   * Parse JSON Content
   * @param {*} content The JSON content
   * @returns {Bag}
   * @private
   */
  _parseContentJSON(content) {
    if (content === '') {
      return new Bag()
    } else {
      return new Bag(JSON.parse(content))
    }
  }
}

Body.CONTENT_XML  = 'text/xml'
Body.CONTENT_HTML = 'text/html'
Body.CONTENT_TEXT = 'text/plain'
Body.CONTENT_JSON = 'application/json'
Body.DEFAULT_TYPE = Body.CONTENT_JSON
