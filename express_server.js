const express = require("express");  //Lines 1-4 gives express_server.js access to all its required dependencies
const app = express();
const PORT = 8080;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require('morgan');

app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({extended: true})); //code on lines 7-9 are used to init middleware dependencies
app.use(cookieParser());
app.set("view engine", "ejs");

const urlDatabase = {
  "b2xVn2": { longURL: "http://www.lighthouselabs.ca", userID: "abcd12"},
  "9sm5xK": { longURL: "http://www.google.com", userID: "abcd12"},
};

const userDB = {
  "userRandomID": { //exists for example and testing reasons
    id: "userRandomID",
    email: "user@example.com",
    password: "purple-monkey-dinosaur"
  },
};

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

app.get("/urls", (req, res) => { // series of .get methods to render our various pages at their paths, w/ templatevars
  const templateVars = { urls: urlsForUser(req.cookies["user_id"]), user: userDB[req.cookies["user_id"]]};
  res.render("urls_index", templateVars);
});

app.get("/", (req, res) => {
  if(req.cookies["user_id"]) {
    res.redirect("/urls");
  }
  else {
    res.redirect("/register")
  }
});

app.get("/urls/new", (req, res) => {
  const templateVars = { user: userDB[req.cookies["user_id"]] };
  if(req.cookies["user_id"]) {
    res.render("urls_new", templateVars);
  } else {
    res.redirect("/login")
  }
});

app.get("/register", (req, res) => {
  const templateVars = { user: userDB[req.cookies["user_id"]] };
  res.render("registration", templateVars);
});

app.get("/login", (req, res) => {
  const templateVars = { user: userDB[req.cookies["user_id"]] };
  res.render("login", templateVars);
});

app.get("/logout", (req, res) => { // posts result of login form submit into cookie
  res.clearCookie("user_id");
  res.redirect(`/login`);
});

app.get("/urls/:shortURL", (req, res) => {
  const currentUser = req.cookies["user_id"]? "Current User": "Unregistered User";
  if (!req.cookies["user_id"] || req.cookies["user_id"] !== urlDatabase[req.params.shortURL]["userID"]) {
    return res.status(400).send(`${currentUser} does not have access to this URL`)
  } else {
    const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL]["longURL"], user: userDB[req.cookies["user_id"]]};
    res.render("urls_show", templateVars);
  }
});

app.get("/u/:shortURL", (req, res) => { // this app.get is responsilbe for making sure the shortURL can be used to redirect to the long URL
  const longURL = urlDatabase[req.params.shortURL]["longURL"];
  res.redirect(longURL);
});

app.post("/urls", (req, res) => { // responds to the post requests made by the form in /urls/new
  const rShortURL = generateRandomString(); // creates a new random short url
  urlDatabase[rShortURL] = { longURL: req.body.longURL, userID: req.cookies["user_id"] }; // updates database
  console.log(urlDatabase)
  res.redirect(302, `/urls/${rShortURL}`); // redirects to the result
});

app.post("/login", (req, res) => { // posts result of login form submit into cookie
  if (!req.body.email || !req.body.password) {
    return res.status(400).send('Email address or password missing');
  }
  let foundUser = userChecker(req, res);

  if (!foundUser) {
    return res.status(403).send('No user with that email found');
  } else if (foundUser.password !== req.body.password) {
    return res.status(403).send('Incorrect password');
  }
    res.cookie('user_id', foundUser.id);
    res.redirect('/urls');
});

app.post("/register", (req, res) => { // posts result of login form submit into cookie
  const newID = generateRandomString();
  if (!req.body.email || !req.body.password) {
    return res.status(400).send('Email address or password missing');
  }
  let foundUser = userChecker(req, res);
  if (foundUser) {
    return res.status(400).send('Email address already in use');
  }
  userDB[newID] = {
    id: newID,
    email: req.body.email,
    password: req.body.password
  };
  res.cookie("user_id", newID);
  res.redirect(`/urls`);
  
});

app.post("/urls/:shortURL", (req, res) => { //responds to the post request made by delete buttons
  urlDatabase[req.params.shortURL]["longURL"] = req.body.newURL;
  res.redirect(`/urls`);
});

app.post("/urls/:shortURL/delete", (req, res) => { //responds to the post request made by new url form
  delete urlDatabase[req.params.shortURL];
  res.redirect(`/urls`);
});

app.listen(PORT, () => {
  console.log(`TinyApp listening on port ${PORT}!`);
});