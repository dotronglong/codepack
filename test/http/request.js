import Bag from "../../lib/bag"
import Request from "../../lib/http/request"
var expect = require("chai").expect
var url = require("url")

/** @test {Request} */
describe("http/request.js",() => {
  let request
  beforeEach(() => {
    request = new Request()
  })

  /** @test {Request.query} */
  it("[set query] should allow to set query", () => {
    // set query as a string
    let str = "sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=cookie%20nodejs"
    request.query = str
    expect(parseInt(request.query.get("ion"))).to.equal(1)

    let uri = `https://www.google.com.vn/webhp?${str}`
    request.query = url.parse(uri, true, true).query
    expect(parseInt(request.query.get("ion"))).to.equal(1)

    request.query = {ion: 2}
    expect(parseInt(request.query.get("ion"))).to.equal(2)
  })

  /** @test {Request.query} */
  it("[get query] should return an instance of Bag", () => {
    expect(request.query instanceof Bag).to.be.true
  })

  /** @test {Request.server} */
  it("[get server] should return an instance of Bag", () => {
    expect(request.server instanceof Bag).to.be.true
  })

  /** @test {Request.server} */
  it("[set server] should allow to set some properties", () => {
    try {
      request.server = "some-string"
    } catch (e) {
      expect(e instanceof Error).to.be.true
    }

    const data = {some_value: true}
    request.server = data
    expect(request.server.all()).to.deep.equal(data)
  })

  /** @test {Request.client} */
  it("[get client] should return an instance of Bag", () => {
    expect(request.client instanceof Bag).to.be.true
  })

  /** @test {Request.client} */
  it("[set client] should allow to set some properties", () => {
    try {
      request.client = "some-string"
    } catch (e) {
      expect(e instanceof Error).to.be.true
    }

    const data = {some_value: true}
    request.client = data
    expect(request.client.all()).to.deep.equal(data)
  })

  /** @test {Request.host} */
  it("[get host] should return a string/null", () => {
    request.server.set("host", "some-host")
    expect(request.host).to.equal("some-host")
  })

  /** @test {Request.host} */
  it("[set host] should allow to set host", () => {
    request.host = "some-host"
    expect(request.server.get("host")).to.equal("some-host")
  })

  /** @test {Request.type} */
  it("[get type] should return a string/null", () => {
    request.headers.set("content-type", "application/json; charset=utf-8")
    expect(request.type).to.equal("json")

    request = new Request()
    request.headers.set("content-type", "text/xml")
    expect(request.type).to.equal("xml")
  })
})
