import Bag from '../lib/bag';
var expect = require('chai').expect;

describe('bag.js', function() {
  let bag;
  const data = {a: 'hello', b: 'world', 'c': '!'};
  beforeEach(function() {
    bag = new Bag(data);
  })

  it('[constructor] should replace the current data', function() {
    expect(bag.data).to.deep.equal(data);
  });
  it('[get] should return "hello" when getting key "a", and return null if not found', function() {
    expect(bag.get('a')).to.equal('hello');
    expect(bag.get('not_exist')).to.be.null;
  });
  it('[set] should set "hello_world" to key "a"', function() {
    bag.set('a', 'hello_world');
    expect(bag.get('a')).to.equal('hello_world');
  });
  it('[has] should return true on "a", and false on "not_exist"', function() {
    expect(bag.has('a')).to.be.true;
    expect(bag.has('not_exist')).to.be.false;
  });
  it('[remove] should remove the value of key "a"', function() {
    bag.remove('a');
    expect(bag.get('a')).to.be.null;
  });
  it('[all] should return all values of bag', function() {
    expect(bag.all()).to.deep.equal(data);
  });
  it('[only] should return {a: \'hello\', b: \'world\'} when getting only values of keys "a" and "b"', function() {
    expect(bag.only(['a', 'b'])).to.deep.equal({a: 'hello', b: 'world'});
  });
  it('[clean] should remove all values of bag', function() {
    bag.clean();
    expect(bag.all()).to.deep.equal({});
  });
});