import {Class} from '../lib/class';
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

describe('module.js', function() {
  it('should return "Hello World" which is a result from combination between A.hello() and B.world()', function() {
    let c = new C();
    expect(c.helloWorld()).to.equal('Hello World!');
  });
});