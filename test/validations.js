'use strict';

var validations = require('../lib/jet-vermillion-generator/validations.js');

exports.validations = {
  setUp: function(done) {
    done();
  },
  'rejects too long a name': function(test) {
    test.assert(validations.isInputValid('123456789'), 'should be false');
    test.done();
  },
  'rejects empty string': function(test) {
    test.assert(validations.isInputValid(''), "should be false");
    test.done();
  }
};
