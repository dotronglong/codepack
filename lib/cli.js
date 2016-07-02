const clc = require('cli-color');

class cli {
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

    const msg = clc[color](line);
    this.NEW_LINE ? console.log(msg) : process.stdout.write(msg);
  }
}
cli.NEW_LINE      = true;
cli.COLOR_ERROR   = 'red';
cli.COLOR_WARNING = 'magenta';
cli.COLOR_INFO    = 'blue';
cli.COLOR_SUCCESS = 'green';

export default cli