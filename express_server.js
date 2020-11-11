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
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

const userDB = { 
  "userRandomID": { //exists for example and testing reasons
    id: "userRandomID", 
    email: "user@example.com", 
    password: "purple-monkey-dinosaur"
  },
}

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

app.get("/urls", (req, res) => { // series of .get methods to render our various pages at their paths, w/ templatevars
  const templateVars = { urls: urlDatabase, username: req.cookies["username"]}; 
  res.render("urls_index", templateVars);
});

app.get("/", (req, res) => {  
  res.redirect("/urls")
});

app.get("/urls/new", (req, res) => {
  const templateVars = { username: req.cookies["username"] };
  res.render("urls_new", templateVars);
});

app.get("/register", (req, res) => {
  const templateVars = { username: req.cookies["username"] };
  res.render("registration", templateVars);
});

app.get("/urls/:shortURL", (req, res) => {
  const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL], userDB: req.cookies["username"],};
  res.render("urls_show", templateVars);
});

app.get("/u/:shortURL", (req, res) => { // this app.get is responsilbe for making sure the shortURL can be used to redirect to the long URL
  const longURL = urlDatabase[req.params.shortURL];
  res.redirect(longURL);
});

app.post("/urls", (req, res) => { // responds to the post requests made by the form in /urls/new
  const rShortURL = generateRandomString(); // creates a new random short url
  urlDatabase[rShortURL] = req.body.longURL; // updates database
  res.redirect(302, `/urls/${rShortURL}`); // redirects to the result
});

app.post("/login", (req, res) => { // posts result of login form submit into cookie
  res.cookie("username", req.body.username);
  res.redirect(`/urls`);
});

app.post("/logout", (req, res) => { // posts result of login form submit into cookie
  res.clearCookie("user_id");
  res.redirect(`/urls`);
});

app.post("/register", (req, res) => { // posts result of login form submit into cookie
  const newID = generateRandomString();
  userDB[newID] = {
    id: newID,
    email: req.body.email,
    password: req.body.password
  }
  res.cookie("user_id", newID)
  res.redirect(`/urls`);
});

app.post("/urls/:shortURL", (req, res) => { //responds to the post request made by delete buttons
  urlDatabase[req.params.shortURL] = req.body.newURL;
  res.redirect(`/urls`);
});

app.post("/urls/:shortURL/delete", (req, res) => { //responds to the post request made by new url form
  delete urlDatabase[req.params.shortURL];
  res.redirect(`/urls`);
});

app.listen(PORT, () => {
  console.log(`TinyApp listening on port ${PORT}!`);
});