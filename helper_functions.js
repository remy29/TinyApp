const generateRandomString = function() {  // used to create random 6 character string. creates random index value and pushes character associated to it to a result
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

const userChecker = function(req) { //checks if user already exists
  let user;
  for (const id in userDB) {
    if (userDB[id]["email"] === req.body.email) {
      user = userDB[id];
    }
  }
  return user;
};

const urlsForUser = function(id) {
  const foundURLs = {};
  for (const shortURLs in urlDatabase) {
    if (urlDatabase[shortURLs]["userID"] === id) {
      foundURLs[shortURLs] = urlDatabase[shortURLs]["longURL"];
    }
  }
  return foundURLs;
};

const isLoggedIn = function(req) {
  const currentUser = req.session["user_id"] ? `${userDB[req.session["user_id"]]["email"]}` : "Unregistered Guest";
  return currentUser;
};

module.exports = { generateRandomString, userChecker, urlsForUser, isLoggedIn }



const { generateRandomString } = require('./helper_functions')
const { userChecker } = require('./helper_functions')
const { urlsForUser } = require('./helper_functions')
const { generateRandomString } = require('./helper_functions')