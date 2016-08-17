import Collection from "../lib/collection"
var expect = require("chai").expect

/** @test {Collection} */
describe("collection.js", () => {
  let col
  beforeEach(() => {
    col = new Collection()
  })

  /** @test {Collection#add} */
  it("[add] should allow to add an item", () => {
    col.add(5)
    expect(col.all()[0]).to.equal(5)

    col.push(10)
    expect(col.all()[1]).to.equal(10)
  })

  /** @test {Collection#remove} */
  it("[remove] should allow to remove an item", () => {
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

  /** @test {Collection#pop} */
  it("[pop] should return last item of collection", () => {
    col.add(5).add({a: 5, b: 6}).add({a: 5}).add({b: 6})
    expect(col.pop()).to.deep.equal({b: 6})
  })

  /** @test {Collection#get} */
  it("[get] should return appropriate item", () => {
    col.add(5).add({a: 5, b: 6}).add({a: 5}).add({b: 6})
    expect(col.get(1)).to.deep.equal({a: 5, b: 6})
    expect(col.get(3)).to.deep.equal({b: 6})
    expect(col.get(4)).to.be.null
  })

  /** @test {Collection#all} */
  it("[all] should return all items of collection", () => {
    col.add(5).add({a: 5, b: 6}).add({a: 5}).add({b: 6})
    expect(col.all()).to.deep.equal([
      5,
      {a: 5, b: 6},
      {a: 5},
      {b: 6}
    ])
  })

  /** @test {Collection#find} */
  it("[find] should return expected items", () => {
    col.add(5).add({a: 5, b: 6}).add({a: 5}).add({b: 6})
    expect(col.find({b: 6}).all()).to.deep.equal([
      {a: 5, b: 6},
      {b: 6}
    ])
  })

  /** @test {Collection#has} */
  it("[has] should return true if item exists in collection", () => {
    col.add(5).add({a: 5, b: 6}).add({a: 5}).add({b: 6})

    expect(col.has(6)).to.be.false
    expect(col.has(5)).to.be.true

    expect(col.has({a: 7, b: 6})).to.be.false
    expect(col.has({a: 5, b: 6})).to.be.true
    expect(col.has({b: 6})).to.be.true
  })
})
