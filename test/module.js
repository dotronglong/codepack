import Module from '../lib/module';
import ModuleDescriptor from '../lib/module/descriptor';
var expect = require('chai').expect;
var path = require('path');

describe('module.js', function () {
  // Module.scan('.', ['lib', 'test'])
  //   .then(() => {
  //     console.log('come')
  //     console.log(Module);
  //   });

  const name = 'Core';
  let module;
  beforeEach(function () {
    module = new ModuleDescriptor(name);
    Module.clean();
  });

  it('[add] should allow to add a module', function () {
    Module.add(module);
    expect(Module.Core instanceof ModuleDescriptor).to.be.true;
  });
  it('[remove] should remove "Core" from itself', function() {
    Module.add(module);
    Module.remove(name);
    expect(typeof Module.Core).to.be.equal('undefined');
  });
  it('[has] should return false at the first attempt, and true at the second', function() {
    expect(Module.has('Core')).to.be.false;
    Module.add(module);
    expect(Module.has('Core')).to.be.true;
  });
  it('[scan] should add test/descriptor as a module', function() {
    Module.config.basePath = path.join(Module.config.basePath, 'test', 'module_descriptor');
    Module.scan()
          .then((modules) => {
            expect(modules.length).to.equal(2);
          });
  });
});