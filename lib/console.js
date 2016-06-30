const colors = require('colors');

class Console {
  static error(...args) {
    this.line(this.COLOR_ERROR, args);
  }

  static warning(...args) {
    this.line(this.COLOR_WARNING, args);
  }

  static info(...args) {
    this.line(this.COLOR_INFO, args);
  }

  static success(...args) {
    this.line(this.COLOR_SUCCESS, args);
  }

  static line(color, args) {
    let line = '';
    if (Array.isArray(args)) {
      line = args.join(' ');
    }

    this.NEW_LINE ? console.log(line[color]) : process.stdout.write(line[color]);
  }
}
Console.NEW_LINE      = true;
Console.COLOR_ERROR   = 'red';
Console.COLOR_WARNING = 'magenta';
Console.COLOR_INFO    = 'blue';
Console.COLOR_SUCCESS = 'green';

export default Console