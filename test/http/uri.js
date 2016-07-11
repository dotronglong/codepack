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
  it('[from] should parse an uri string, and return an instance of Uri', () => {
    let string = 'https://user:pass@domain.com/some-path?key=value&other-key=other-value#my-fragment'
    let uri = Uri.from(string)
    expect(uri.scheme).to.equal('https')
    expect(uri.user).to.equal('user')
    expect(uri.pwd).to.equal('pass')
    expect(uri.host).to.equal('domain.com')
    expect(uri.port).to.equal(443)
    expect(uri.path).to.equal('/some-path')
    expect(uri.query.all()).to.deep.equal({key: 'value', 'other-key': 'other-value'})
    expect(uri.fragment).to.equal('my-fragment')

    string = 'http://domain.com/some-path?key=value&other-key=other-value#my-fragment'
    uri = Uri.from(string)
    expect(uri.scheme).to.equal('http')
    expect(uri.host).to.equal('domain.com')
    expect(uri.port).to.equal(80)
    expect(uri.path).to.equal('/some-path')
    expect(uri.query.all()).to.deep.equal({key: 'value', 'other-key': 'other-value'})
    expect(uri.fragment).to.equal('my-fragment')
  })
  it('[toString] should return a string represent for the Uri', () => {
    const string = 'https://user:pass@domain.com/some-path?key=value&other-key=other-value#my-fragment'
    let uri = Uri.from(string)
    expect(uri.toString()).to.equal(string)
  })
})
