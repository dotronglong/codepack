import Class from '../lib/class';
var expect = require('chai').expect;

class A {
  hello() {
    return 'Hello';
  }
}

class B {
  world() {
    return 'World';
  }
}

class C extends Class.combine(A, B) {
  helloWorld() {
    return this.hello() + ' ' + this.world() + '!';
  }
}

describe('class.js', function() {
  let c = new C();
  const prop_name = 'my_prop';
  beforeEach(() => {
    c = new C()
  })
  it('[instanceof] should be an instanceof A and B', function() {
    expect(Class.instanceof(c, A)).to.be.true;
    expect(Class.instanceof(c, B)).to.be.true;
    expect(Class.instanceof(c, "A")).to.be.true;
    expect(Class.instanceof(c, "B")).to.be.true;
  });
  it('[methodExists] should return true on "hello", "world", "helloWorld", and false on "hello_world"', function() {
    expect(Class.methodExists(c, 'hello')).to.be.true
    expect(Class.methodExists(c, 'world')).to.be.true
    expect(Class.methodExists(C, 'helloWorld')).to.be.true
  })
  it('[combine] should return "Hello World" which is a result from combination between A.hello() and B.world()', function() {
    expect(c.helloWorld()).to.equal('Hello World!');
  });
  it('[definePropertyNotEnumerable] should create new property which is not enumerable', function() {
    Class.definePropertyNotEnumerable(c, prop_name)
    expect(Object.getOwnPropertyDescriptor(c, prop_name).enumerable).to.be.false
  })
  it('[definePropertyNotWritable] should create new property which is not writable', function() {
    Class.definePropertyNotWritable(c, prop_name)
    expect(Object.getOwnPropertyDescriptor(c, prop_name).writable).to.be.false
  })
  it('[definePropertyNotConfigurable] should create new property which is not configurable', function() {
    Class.definePropertyNotConfigurable(c, prop_name)
    expect(Object.getOwnPropertyDescriptor(c, prop_name).configurable).to.be.false
  })
});