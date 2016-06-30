import Console from '../lib/console';
var expect = require('chai').expect;

describe('console.js', function() {
  beforeEach(() => {
    Console.NEW_LINE = true;
  });

  it('[error] should print "." in red color', function() {
    Console.NEW_LINE = false;
    Console.error('.');
  });
  it('[success] should print "." in green color', function() {
    Console.NEW_LINE = false;
    Console.success('.');
  });
  it('[warning] should print "." in orange color', function() {
    Console.NEW_LINE = false;
    Console.warning('.');
  });
  it('[info] should print "." in blue color', function() {
    Console.NEW_LINE = false;
    Console.info('.');
  });
});