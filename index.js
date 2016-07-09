const distDir  = 'dist';
function include(file, name) {
  const package = require('./' + distDir + '/' + file);
  return typeof name === 'undefined' ? package.default : package[name];
}

module.exports = {
  Bag: include('bag'),
  Class: include('class'),
  Str: include('str'),
  Singleton: include('singleton'),
  EventManager: include('em'),

  cli: include('cli')
};