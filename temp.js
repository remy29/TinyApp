app.get("/urls/:shortURL", (req, res) => {
  const currentUser = isLoggedIn(req);
  if (!req.cookies["user_id"] || req.cookies["user_id"] !== urlDatabase[req.params.shortURL]["userID"]) {
    return res.status(400).send(`User:${currentUser} does not have access to this URL`)
  } else {
    const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL]["longURL"], user: userDB[req.cookies["user_id"]]};
    res.render("urls_show", templateVars);
  }
});

app.post("/urls/:shortURL", (req, res) => { //responds to the post request made by delete buttons
  const currentUser = isLoggedIn(req);
  if (!req.cookies["user_id"] || req.cookies["user_id"] !== urlDatabase[req.params.shortURL]["userID"]) {
    return res.status(400).send(`${currentUser} does not have access to this URL`)
  } else {
      urlDatabase[req.params.shortURL]["longURL"] = req.body.newURL;
      res.redirect(`/urls`);
    }
});

const isLoggedIn = function(req) {
  const currentUser = req.cookies["user_id"] ? `${userDB[req.cookies["user_id"]]["email"]}` : "Unregistered Guest";
  console.log(userDB[req.cookies["user_id"]]["email"])
  return currentUser;
}
