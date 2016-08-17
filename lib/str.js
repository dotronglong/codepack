/**
 * String processor
 * @todo Manipulate string
 */
export default class Str {
  /**
   * Modify first case of string with delimiter
   * @access private
   * @param {!string} string String to modify first case
   * @param {?string} delimiter Delimiter of string
   * @param {?function} callback Callback to deal with character
   * @returns {string}
   */
  static changeFirstCase(string, delimiter, callback) {
    const pattern = new RegExp(`^([a-zA-Z])|\\${delimiter}([a-zA-Z])`, "ig")
    string.replace(pattern, (...args) => {
      let char = args[1] || args[2],
          charAt = args[3]
      if (typeof args[1] === "undefined") {
        string = string.slice(0, charAt + 1) + callback(char) + string.slice(charAt + 2)
      } else {
        string = string.slice(0, charAt) + callback(char) + string.slice(charAt + 1)
      }
    })
    return string
  }

  /**
   * Change the first case of string (or before delimiter character) to upper case
   * @param {!string} string String to modify first case
   * @param {?string} delimiter Delimiter of string
   * @returns {string}
   */
  static upperCaseFirst(string, delimiter) {
    return this.changeFirstCase(string, delimiter, char => char.toUpperCase())
  }

  /**
   * Change the first case of string (or before delimiter character) to lower case
   * @param {!string} string String to modify first case
   * @param {?string} delimiter Delimiter of string
   * @returns {string}
   */
  static lowerCaseFirst(string, delimiter) {
    return this.changeFirstCase(string, delimiter, char => char.toLowerCase())
  }

  /**
   * Change the first case of string to lower case
   * @param {!string} string String to modify first case
   * @returns {string}
   */
  static lcfirst(string) {
    return Str.lowerCaseFirst(string)
  }

  /**
   * Change the first case of string to upper case
   * @param {!string} string String to modify first case
   * @returns {string}
   */
  static ucfirst(string) {
    return Str.upperCaseFirst(string)
  }
}
