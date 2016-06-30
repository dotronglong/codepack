const distDir  = 'dist';
function include(path) {
  return require('./', distDir, path);
}

module.exports = {
  Class: include('class'),
  Module: include('module'),
  Singleton: include('singleton')
};