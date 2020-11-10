const express = require("express");  //Lines 1-4 gives express_server.js access to all its required dependencies
const app = express();
const PORT = 8080; // default port 8080
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true})); // allows us to use the body-parser middle-ware to convert request body to readable string

app.set("view engine", "ejs"); // allows us to use ESJ

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
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


// Lines 14-25 are code used for demonstration of .get functionality
/* app.get("/", (req, res) => {
  res.send("Hello!");
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
}); */

app.get("/urls", (req, res) => { // Line 42-54 are used to set up how the server reacts to get requests.
  const templateVars = { urls: urlDatabase }; //They use ESJ to render their respective esj files using the template variables assigned to them
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

app.get("/urls/:shortURL", (req, res) => {
  const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL] };
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


app.listen(PORT, () => {
  console.log(`TinyApp listening on port ${PORT}!`);
});