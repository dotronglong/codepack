import Module from '../lib/module';
import ModuleDescriptor from '../lib/module/descriptor';
var expect = require('chai').expect;
var path = require('path');

class Core extends ModuleDescriptor {

}
describe('module.js', function () {
  const name = 'Core';
  let module;
  beforeEach(function () {
    module = new Core(name);
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
  it('[getModuleNames] should return the name of all added modules', function() {
    let m1 = new ModuleDescriptor('Module_1')
    let m2 = new ModuleDescriptor('Module_2')
    let m3 = new ModuleDescriptor('Module_3')
    Module.add(m1), Module.add(m2), Module.add(m3)
    expect(Module.getModuleNames().length).to.equal(3)
    expect(Module.getModuleNames()).to.deep.equal([m1.getName(), m2.getName(), m3.getName()])
  });
});