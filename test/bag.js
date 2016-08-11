import Bag from '../lib/bag'
var expect = require('chai').expect

describe('bag.js', function() {
  let bag
  const data = {a: 'hello', b: 'world', 'c': '!'}
  beforeEach(function() {
    bag = new Bag(data)
  })

  it('[constructor] should replace the current data', () => {
    expect(bag.data).to.deep.equal(data)
  })
  it('[size|get length] should return number of items in bag', () => {
    expect(bag.size()).to.equal(3)
    expect(bag.length).to.equal(3)
  })
  it('[get keys] should return all keys in bag', () => {
    expect(bag.keys).to.deep.equal(['a', 'b', 'c'])

    let keys = []
    for (let key of bag.keys) {
      keys.push(key)
    }
    expect(keys).to.deep.equal(['a', 'b', 'c'])
  })
  it('[get values] should return all values in bag', () => {
    expect(bag.values).to.deep.equal(['hello', 'world', '!'])
  })
  it('[get] should return "hello" when getting key "a", and return null if not found', function() {
    expect(bag.get('a')).to.equal('hello')
    expect(bag.get('not_exist')).to.be.null
  })
  it('[set] should set "hello_world" to key "a"', () => {
    bag.set('a', 'hello_world')
    expect(bag.get('a')).to.equal('hello_world')
  })
  it('[has] should return true on "a", and false on "not_exist"', () => {
    expect(bag.has('a')).to.be.true
    expect(bag.has('not_exist')).to.be.false
  })
  it('[delete] should remove the value of key "a"', () => {
    bag.delete('a')
    expect(bag.get('a')).to.be.null
  })
  it('[all] should return all values of bag', () => {
    expect(bag.all()).to.deep.equal(data)
  })
  it('[only] should return {a: \'hello\', b: \'world\'} when getting only values of keys "a" and "b"', function() {
    expect(bag.only(['a', 'b'])).to.deep.equal({a: 'hello', b: 'world'})
  })
  it('[clean] should remove all values of bag', () => {
    bag.clean()
    expect(bag.all()).to.deep.equal({})
  })
  it('[toString] should return a string which combine all keys and values', () => {
    expect(bag.toString()).to.equal('a=hello&b=world&c=!')
  })
  it('[forEach] should allow to run loop through items', () => {
    let keys = [], values = []
    bag.forEach((key, value) => {
      keys.push(key)
      values.push(value)
    })
    expect(keys).to.deep.equal(['a', 'b', 'c'])
    expect(values).to.deep.equal(['hello', 'world', '!'])
  })
  it('[Symbol.iterator] should allow to walk through items', () => {
    let keys = [], values = []
    for (let [key, value] of bag) {
      keys.push(key)
      values.push(value)
    }
    expect(keys).to.deep.equal(['a', 'b', 'c'])
    expect(values).to.deep.equal(['hello', 'world', '!'])
  })
})