const { assert } = require('chai');

const { generateRandomString } = require('../helper_functions');


describe('generateRandomString', function() {
  it('should return a string with 6 characters', function() {
    assert.strictEqual(generateRandomString().length, 6)
  });
});