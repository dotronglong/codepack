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
  it('should be an instanceof A and B', function() {
    let c = new C();
    expect(Class.instanceof(c, A)).to.be.true;
    expect(Class.instanceof(c, B)).to.be.true;
    expect(Class.instanceof(c, "A")).to.be.true;
    expect(Class.instanceof(c, "B")).to.be.true;
  });
  it('should return "Hello World" which is a result from combination between A.hello() and B.world()', function() {
    let c = new C();
    expect(c.helloWorld()).to.equal('Hello World!');
  });
});