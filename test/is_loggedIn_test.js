const { assert } = require('chai');

const { isLoggedIn } = require('../helper_functions');

const testUsers = {
  "userRandomID": {
    id: "userRandomID", 
    email: "user@example.com", 
    password: "purple-monkey-dinosaur"
  },
  "user2RandomID": {
    id: "user2RandomID", 
    email: "user2@example.com", 
    password: "dishwasher-funk"
  }
};

describe('isLoggedIn', function() {

  it('should return the email of the current logged in', function() {
    const user = isLoggedIn("userRandomID", testUsers)
    const expectedOutput = "user@example.com";
    assert.strictEqual(user, expectedOutput)
  });

  it('should return "Unregistered Guest" if no users are logged in', function() {
    const user = isLoggedIn(undefined, testUsers)
    const expectedOutput = "Unregistered Guest";
    assert.strictEqual(user, expectedOutput)
  });

});