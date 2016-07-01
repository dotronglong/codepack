import Str from '../lib/str';
var expect = require('chai').expect;

describe('str.js', function() {
  it('[lcfirst] should make first character to lower case', function() {
    const string = 'Normal';
    expect(Str.lcfirst(string)).to.equal('normal');
  });
  it('[ucfirst] should make first character to upper case', function() {
    const string = 'normal';
    expect(Str.ucfirst(string)).to.equal('Normal');
  });
});