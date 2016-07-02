require("babel-polyfill");
const distDir  = 'dist';
function include(file, name) {
  const package = require('./' + distDir + '/' + file);
  return typeof name === 'undefined' ? package.default : package[name];
}

module.exports = {
  Bag: include('bag'),
  Class: include('class'),
  Module: include('module'),
  ModuleDescriptor: include('module/descriptor'),
  Str: include('str'),
  Singleton: include('singleton'),

  cli: include('cli')
};