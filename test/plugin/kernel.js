var expect = require("chai").expect
import Kernel from "../../lib/plugin/kernel"

describe("plugin/kernel.js", () => {
  let kernel = new Kernel()
  beforeEach(() => {
    kernel = new Kernel()
  })

  it("[setUpRequest] should build a request from resource", () => {
    const resource = {
      headers: {a: 5, b: 6, host: "domain.com:8080"},
      method: "GET",
      url: "/my-path"
    }

    let request = kernel.setUpRequest(resource)
    expect(request.resource).to.deep.equal(resource)
    expect(request.headers.all()).to.deep.equal(resource.headers)
    expect(request.method).to.equal(resource.method)
    expect(request.path).to.equal(resource.url)
    expect(request.host).to.equal("domain.com")
    expect(request.port).to.equal(8080)
  })
})