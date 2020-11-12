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

app.get("/urls/:shortURL", (req, res) => {
  if (req.cookies["user_id"] !== urlDatabase[req.params.shortURL]["userID"]) {
    res.status(400).send(`User: ${userDB[req.cookies["user_id"]]} does not have access to this URL`)
    res.redirect("/urls")
  } else {
    const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL]["longURL"], user: userDB[req.cookies["user_id"]]};
    res.render("urls_show", templateVars);
  }
});