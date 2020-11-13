const generateRandomString = function() {  // used to create random 6 character string. creates random index value and pushes character associated to it to a result
  let i = 0;
  let result = '';
  let charset = '0123456789abcdefghijklmnopqrstuvwxyz';

  do {
    let y = Math.floor(Math.random() * 36);
    result += charset[y];
    i++;
  }
  while (i < 6);

  return result;
};

const getUserByEmail = function(email, database) { //checks if user already exists by email address returns user ID associated or undefined
  let user;

  for (const id in database) {
    if (database[id]['email'] === email) {
      user = database[id];
    }
  }

  return user;
};


const urlsForUser = function(id, database) { // returns and object of urls associate to an id
  const foundURLs = {};

  for (const shortURLs in database) {
    if (database[shortURLs]['userID'] === id) {
      foundURLs[shortURLs] = database[shortURLs]['longURL'];
    }
  }

  return foundURLs;
};


const isLoggedIn = function(id, database) { //used to check if what type of user is using tinyApp, for registered user it will return their email, and returns unregistered guest otherwise
  const currentUser = id ? `${database[id]['email']}` : 'Unregistered Guest';
  
  return currentUser;
};


module.exports = { generateRandomString, getUserByEmail, urlsForUser, isLoggedIn };



