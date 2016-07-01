import Module from '../lib/module';
var expect = require('chai').expect;
import path from 'path';

describe('module.js', function() {
  Module.scan('.', ['lib', 'test'])
    .then(() => {
      console.log('come')
      console.log(Module);
    });
});