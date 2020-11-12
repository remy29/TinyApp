const urlsForUser = function(id) {
  const foundURLs = {};
  for (const shortURLs in urlDatabase) {
    if (urlDatabase[shortURLs]["userID"] === id) {
      foundURLs[shortURLs] = urlDatabase[shortURLs]["longURL"];
    }
  }
  return foundURLs;
};

const urlDatabase = {
  "b2xVn2": { longURL: "http://www.lighthouselabs.ca", userID: "abcd12"},
  "9sm5xK": { longURL: "http://www.google.com", userID: "abcd12"},
};

console.log(urlsForUser("abcd12"));