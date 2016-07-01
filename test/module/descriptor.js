import ModuleDescriptor from '../../lib/module/descriptor';
var expect = require('chai').expect;

describe('module/descriptor.js', function() {
  let module = new ModuleDescriptor();
  beforeEach(function() {
    module = new ModuleDescriptor();
  });

  it('[getName] should return "Core"', function() {
    module.name = 'Core';
    expect(module.getName()).to.equal('Core');
  });
  it('[setName] should set name to "Core"', function() {
    module.setName('Core');
    expect(module.getName()).to.equal('Core');
  });

  it('[getContent] should return \'{a: "b"}\'', function() {
    module.content = {a: "b"};
    expect(module.getContent()).to.deep.equal({a: "b"});
  });
  it('[setContent] should set content to \'{a: "b"}\'', function() {
    module.setContent({a: "b"});
    expect(module.getContent()).to.deep.equal({a: "b"});
  });
});