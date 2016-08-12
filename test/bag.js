import Bag from '../lib/bag'
var expect = require('chai').expect

/** @test {Bag} */
describe('bag.js', function() {
  let bag
  const data = {a: 'hello', b: 'world', 'c': '!'}
  beforeEach(function() {
    bag = new Bag(data)
  })

  /** @test {Bag#constructor} */
  it('[constructor] should replace the current data', () => {
    expect(bag.all()).to.deep.equal(data)
  })

  /** @test {Bag#size} */
  it('[size|get length] should return number of items in bag', () => {
    expect(bag.size()).to.equal(3)
    expect(bag.length).to.equal(3)
  })

  /** @test {Bag.keys} */
  it('[get keys] should return all keys in bag', () => {
    expect(bag.keys).to.deep.equal(['a', 'b', 'c'])

    let keys = []
    for (let key of bag.keys) {
      keys.push(key)
    }
    expect(keys).to.deep.equal(['a', 'b', 'c'])
  })

  /** @test {Bag.values} */
  it('[get values] should return all values in bag', () => {
    expect(bag.values).to.deep.equal(['hello', 'world', '!'])
  })

  /** @test {Bag#get} */
  it('[get] should return "hello" when getting key "a", and return null if not found', function() {
    expect(bag.get('a')).to.equal('hello')
    expect(bag.get('not_exist')).to.be.null
  })

  /** @test {Bag#set} */
  it('[set] should set "hello_world" to key "a"', () => {
    bag.set('a', 'hello_world')
    expect(bag.get('a')).to.equal('hello_world')
  })

  /** @test {Bag#has} */
  it('[has] should return true on "a", and false on "not_exist"', () => {
    expect(bag.has('a')).to.be.true
    expect(bag.has('not_exist')).to.be.false
  })

  /** @test {Bag#delete} */
  it('[delete] should remove the value of key "a"', () => {
    bag.delete('a')
    expect(bag.get('a')).to.be.null
  })

  /** @test {Bag#all} */
  it('[all] should return all values of bag', () => {
    expect(bag.all()).to.deep.equal(data)
  })

  /** @test {Bag#only} */
  it('[only] should return {a: \'hello\', b: \'world\'} when getting only values of keys "a" and "b"', function() {
    expect(bag.only(['a', 'b'])).to.deep.equal({a: 'hello', b: 'world'})
  })

  /** @test {Bag#clear} */
  it('[clear] should remove all values of bag', () => {
    bag.clear()
    expect(bag.all()).to.deep.equal({})
  })

  /** @test {Bag#toString} */
  it('[toString] should return a string which combine all keys and values', () => {
    expect(bag.toString()).to.equal('a=hello&b=world&c=!')
  })

  /** @test {Bag#forEach} */
  it('[forEach] should allow to run loop through items', () => {
    let keys = [], values = []
    bag.forEach((key, value) => {
      keys.push(key)
      values.push(value)
    })
    expect(keys).to.deep.equal(['a', 'b', 'c'])
    expect(values).to.deep.equal(['hello', 'world', '!'])
  })

  /** @test {Bag#replace} */
  it('[replace] should replace the current data of bag', () => {
    bag.replace({c: 'Hello World'})
    expect(bag.all()).to.deep.equal({c: 'Hello World'})
  })

  /** @test {Bag#Symbol.iterator} */
  it('[Symbol.iterator] should allow to walk through items', () => {
    let keys = [], values = []
    for (let [key, value] of bag) {
      keys.push(key)
      values.push(value)
    }
    expect(keys).to.deep.equal(['a', 'b', 'c'])
    expect(values).to.deep.equal(['hello', 'world', '!'])
  })

  /** @test {Bag#entries} */
  it('[entries] should return an iterator object', () => {
    let keys = [], values = []
    for (let [key, value] of bag.entries()) {
      keys.push(key)
      values.push(value)
    }
    expect(keys).to.deep.equal(['a', 'b', 'c'])
    expect(values).to.deep.equal(['hello', 'world', '!'])

    keys = [], values = []
    for (let [key, value] of bag.entries(['b', 'c'])) {
      keys.push(key)
      values.push(value)
    }
    expect(keys).to.deep.equal(['b', 'c'])
    expect(values).to.deep.equal(['world', '!'])
  })
})
