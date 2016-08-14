export default class Str {
  static lcfirst(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
  }

  static ucfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  static changeFirstCase(string, delimiter, callback) {
    const pattern = new RegExp(`^([a-zA-Z])|\\${delimiter}([a-zA-Z])`, 'ig')
    string.replace(pattern, (...args) => {
      let char = args[1] || args[2],
          charAt = args[3]
      if (typeof args[1] === 'undefined') {
        string = string.slice(0, charAt + 1) + callback(char) + string.slice(charAt + 2)
      } else {
        string = string.slice(0, charAt) + callback(char) + string.slice(charAt + 1)
      }
    })
    return string
  }

  static upperCaseFirst(string, delimiter) {
    return this.changeFirstCase(string, delimiter, char => Str.ucfirst(char))
  }

  static lowerCaseFirst(string, delimiter) {
    return this.changeFirstCase(string, delimiter, char => Str.lcfirst(char))
  }
}
