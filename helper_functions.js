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


const urlsForUser = function (id, database) {
  const foundURLs = {};
  for (const shortURLs in database) {
    if (database[shortURLs]["userID"] === id) {
      foundURLs[shortURLs] = database[shortURLs]["longURL"];
    }
  }
  return foundURLs;
};


const isLoggedIn = function (id, database) {
  const currentUser = id ? `${database[id]["email"]}` : "Unregistered Guest";
  return currentUser;
};


module.exports = { generateRandomString, userChecker, urlsForUser, isLoggedIn }



