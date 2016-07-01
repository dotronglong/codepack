import Static from '../lib/static';
var expect = require('chai').expect;

describe('static.js', function() {
  beforeEach(function() {
    Static.clean();
  });

  it('[set] should set "Core" to static properties', function() {
    Static.set('Core', true);
    expect(Static.hasOwnProperty('Core')).to.be.true;
  });
  it('[get] should return true on "Core"', function() {
    Static.set('Core', true);
    expect(Static.get('Core')).to.be.true;
    expect(Static.Core).to.be.true;
  });
  it('[has] should return false at the first attempt, and true at second one', function() {
    expect(Static.has('Core')).to.be.false;
    Static.set('Core', true);
    expect(Static.has('Core')).to.be.true;
  });
  it('[remove] should return false at the first attempt, and true at second one', function() {
    expect(Static.has('Core')).to.be.false;
    Static.set('Core', true);
    expect(Static.has('Core')).to.be.true;
  });
});