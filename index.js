require("babel-polyfill");
const distDir  = 'dist';
function include(file, name) {
  const package = require('./' + distDir + '/' + file);
  return typeof name === 'undefined' ? package.default : package[name];
}

module.exports = {
  Class: include('class'),
  Module: include('module'),
  Singleton: include('singleton')
};