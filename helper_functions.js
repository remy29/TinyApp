const generateRandomString = function () {  // used to create random 6 character string. creates random index value and pushes character associated to it to a result
  let i = 0;
  let result = "";
  let charset = "0123456789abcdefghijklmnopqrstuvwxyz";
  do {
    let y = Math.floor(Math.random() * 36);
    result += charset[y];
    i++;
  }
  while (i < 6);
  return result;
};

const userChecker = function (email, database) { //checks if user already exists
  let user;
  for (const id in database) {
    if (database[id]["email"] === email) {
      user = database[id];
    }
  }
  return user;
};
userChecker(req.body.email, userDB);

const urlsForUser = function (id, database) {
  const foundURLs = {};
  for (const shortURLs in database) {
    if (database[shortURLs]["userID"] === id) {
      foundURLs[shortURLs] = database[shortURLs]["longURL"];
    }
  }
  return foundURLs;
};
urlsForUser(req.session["user_id"], urlDatabase)

const isLoggedIn = function (id, database) {
  const currentUser = id ? `${database[id]["email"]}` : "Unregistered Guest";
  return currentUser;
};
isLoggedIn(req.session["user_id"], userDB)

module.exports = { generateRandomString, userChecker, urlsForUser, isLoggedIn }



const generateRandomString = require('./helper_functions').generateRandomString
const userChecker = require('./helper_functions').userChecker
const urlsForUser = require('./helper_functions').urlsForUser
const isLoggedIn = require('./helper_functions').isLoggedIn