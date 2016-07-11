import Uri from '../../lib/http/uri'
var expect = require('chai').expect

describe('http/uri.js', () => {
  let uri = new Uri()
  beforeEach(() => {
    uri = new Uri()
  })

  it('[get userInfo] should return a string as a combination between user and password', () => {
    uri.user = 'my_account'
    uri.pwd  = 'my_password'
    expect(uri.userInfo).to.equal(`${uri.user}:${uri.pwd}`)
  })
})
