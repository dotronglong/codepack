import Str from '../lib/str'
var expect = require('chai').expect

/** @test {Str} */
describe('str.js', function() {
  /** @test {Str#lcfirst} */
  it('[lcfirst] should make first character to lower case', () => {
    const string = 'Normal'
    expect(Str.lcfirst(string)).to.equal('normal')
  })

  /** @test {Str#ucfirst} */
  it('[ucfirst] should make first character to upper case', () => {
    const string = 'normal'
    expect(Str.ucfirst(string)).to.equal('Normal')
  })

  /** @test {Str#upperCaseFirst} */
  it('[upperCaseFirst] should make first character before delimiter to upper case', () => {
    const string = 'let-Make-It-simple';
    expect(Str.upperCaseFirst(string, '-')).to.equal('Let-Make-It-Simple')
    expect(Str.upperCaseFirst(string)).to.equal('Let-Make-It-simple')
  })

  /** @test {Str#lowerCaseFirst} */
  it('[lowerCaseFirst] should make first character before delimiter to upper case', () => {
    const string = 'let-Make-It-simple';
    expect(Str.lowerCaseFirst(string, '-')).to.equal('let-make-it-simple')
    expect(Str.lowerCaseFirst(string)).to.equal('let-Make-It-simple')
  })
})
