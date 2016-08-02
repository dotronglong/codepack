import Collection from '../lib/collection'
var expect = require('chai').expect

describe('collection.js', () => {
  let col
  beforeEach(() => {
    col = new Collection()
  })

  it('[add] should allow to add an item', () => {
    col.add(5)
    expect(col.all()[0]).to.equal(5)

    col.push(10)
    expect(col.all()[1]).to.equal(10)
  })
  
  it('[remove] should allow to remove an item', () => {
    col.add(5).add({a: 5, b: 6}).add({a: 5}).add({b: 6})

    // remove item by index
    col.remove(0)
    expect(col.all()).to.deep.equal([
      {a: 5, b: 6},
      {a: 5},
      {b: 6}
    ])

    // remove item by object
    col.remove({a: 5})
    expect(col.all()).to.deep.equal([
      {a: 5, b: 6},
      {b: 6}
    ])
  })

  it('[pop] should return last item of collection', () => {
    col.add(5).add({a: 5, b: 6}).add({a: 5}).add({b: 6})
    expect(col.pop()).to.deep.equal({b: 6})
  })

  it('[get] should return appropriate item', () => {
    col.add(5).add({a: 5, b: 6}).add({a: 5}).add({b: 6})
    expect(col.get(1)).to.deep.equal({a: 5, b: 6})
    expect(col.get(3)).to.deep.equal({b: 6})
    expect(col.get(4)).to.be.null
  })

  it('[all] should return all items of collection', () => {
    col.add(5).add({a: 5, b: 6}).add({a: 5}).add({b: 6})
    expect(col.all()).to.deep.equal([
      5,
      {a: 5, b: 6},
      {a: 5},
      {b: 6}
    ])
  })
})