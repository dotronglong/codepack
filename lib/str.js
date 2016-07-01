export default class Str {
  static lcfirst(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
  }

  static ucfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}