'use strict';

var jet_vermillion_generator = require('../lib/jet-vermillion-generator.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.jet_vermillion_generator = {
  setUp: function(done) {
    // setup here
    done();
  },
  'generates code properly': function(test) {
    test.equal(jet_vermillion_generator.generate('LOCKS'), 'W-XX9NV8A+30', 'should be W-XX9NV8A+30.');

    test.done();
  },
  'generates multiple codes properly': function(test) {
    test.equal(jet_vermillion_generator.generate('LOCKS'), 'W-XX9NV8A+30', 'should be W-XX9NV8A+30.');
    test.equal(jet_vermillion_generator.generate('RENAN'), 'M-AFY9V8A-30', 'should be M-AFY9V8A-30.');

    test.done();
  },
  'is case-insensitive': function(test) {
    var uppercase = jet_vermillion_generator.generate('LOCKS');
    var lowercase = jet_vermillion_generator.generate('locks');

    test.equal(uppercase, lowercase,      'should be W-XX9NV8A+30.');
    test.equal(uppercase, 'W-XX9NV8A+30', 'should be W-XX9NV8A+30.');
    test.equal(lowercase, 'W-XX9NV8A+30', 'should be W-XX9NV8A+30.');

    test.done();
  }
};
