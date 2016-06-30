import Singleton from '../lib/singleton';
import Class from '../lib/class';
var expect = require('chai').expect;

class A extends Singleton {}

describe('singleton.js', function() {
  it('[prototype] should have static method getInstance', function() {
    // Make sure returned instance must be an instance of A
    expect(A.getInstance() instanceof A).to.be.true;

    // Make sure getInstance compatible with Class.instanceof
    expect(Class.instanceof(A.getInstance(), A)).to.be.true;
    expect(Class.instanceof(A.getInstance(), 'A')).to.be.true;
  });
});