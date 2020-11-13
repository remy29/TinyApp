const { assert } = require('chai');

const { urlsForUser } = require('../helper_functions');

const testDatabase = {
  'exShortURL': {
    longURL: 'longURL',
    userID: '12345',
  },
  'exShortURL2': {
    longURL: 'longURL2',
    userID: '12346',
  }
};

describe('urlsForUser', function() {
  it('should return an object of matching urls for valid user id', function() {
    const urls = urlsForUser('12345', testDatabase);
    const expectedOutput = 'longURL';
    assert.strictEqual(urls['exShortURL'], expectedOutput);
  });

  it('should return an empty object if there are no matches', function() {
    const urls = urlsForUser('12347', testDatabase);
    const expectedOutput = '{}';
    assert.strictEqual(JSON.stringify(urls), expectedOutput);
  });

});