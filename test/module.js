import {Module} from '../lib/module';
var expect = require('chai').expect;

describe('module.js', function() {
  it('[getPath] should return empty string', function() {
    expect(Module.getPath()).to.be.empty;
  });
  it('[setPath] should set path to "/folder"', function() {
    const path = '/folder';
    Module.setPath(path);
    expect(Module.getPath()).to.equal(path);
  });
  it('[register] should add a module to modules with specific name', function() {
    const name = 'core';
    const module = {}
  });
});