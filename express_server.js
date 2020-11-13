const express = require('express');  //Lines 1-7 gives express_server.js access to all its required dependencies
const methodOverride = require('method-override');
const app = express();               //8-11 import all of the helper functions
const PORT = 8080;
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const morgan = require('morgan');
const bcrypt = require('bcrypt');
const {generateRandomString} = require('./helper_functions');
const {getUserByEmail} = require('./helper_functions');
const {urlsForUser} = require('./helper_functions');
const {isLoggedIn} = require('./helper_functions');

app.use(methodOverride('_method'));
app.use(morgan('tiny')); // Lines 13-17 initialize various middleware dependencies
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession({ name: 'session', keys: ['onekey'] }));

app.set('view engine', 'ejs');

const urlDatabase = {};
const userDB = {};

app.get('/urls', (req, res) => { // lines 22-67 of .get methods to render our various pages at their paths, w/ templatevars
  const templateVars = { urls: urlsForUser(req.session['user_id'], urlDatabase), user: userDB[req.session['user_id']]};

  if (req.session['user_id']) {
    res.render('urls_index', templateVars);
  } else {
    res.status(401).send('Unregisted Users do not have access to this page');
  }
});

app.get('/', (req, res) => {
  if (req.session['user_id']) {
    res.redirect('/urls');
  } else {
    res.redirect('/login');
  }
});

app.get('/urls/new', (req, res) => {
  const templateVars = { user: userDB[req.session['user_id']] };

  if (req.session['user_id']) {
    res.render('urls_new', templateVars);
  } else {
    res.redirect('/login');
  }
});

app.get('/register', (req, res) => {
  if (req.session['user_id']) {
    return res.redirect('/urls');
  }
  
  const templateVars = { user: userDB[req.session['user_id']] };

  res.render('registration', templateVars);
});

app.get('/login', (req, res) => {
  if (req.session['user_id']) {
    return res.redirect('/urls');
  }

  const templateVars = { user: userDB[req.session['user_id']] };

  res.render('login', templateVars);
});

app.get('/urls/:shortURL', (req, res) => {
  const currentUser = isLoggedIn(req.session['user_id'], userDB);

  if (!urlDatabase[req.params.shortURL]) {
    res.status(404).send('URL not found');
  }

  if (!req.session['user_id'] || req.session['user_id'] !== urlDatabase[req.params.shortURL]['userID']) {

    return res.status(400).send(`User: ${currentUser} does not have access to this URL`);

  } else {
    const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL]['longURL'], user: userDB[req.session['user_id']]};

    res.render('urls_show', templateVars);
  }
});

app.get('/u/:shortURL', (req, res) => { // this app.get is responsilbe for making sure the shortURL can be used to redirect to the long URL
  if (!urlDatabase[req.params.shortURL]) {
    res.status(404).send('URL not found');
  }

  const redirectURL = urlDatabase[req.params.shortURL]['longURL'];

  if (redirectURL[0] === 'w' || redirectURL.slice(0, 4) !== 'http') {
    res.redirect(`http://${redirectURL}`);
  } else {
    res.redirect(redirectURL);
  }
});

app.post('/urls', (req, res) => { // responds to the post requests made by the form in /urls/new
  const rShortURL = generateRandomString(); // creates a new random short url
  const currentUser = isLoggedIn(req.session['user_id'], userDB);

  if (!req.session['user_id']) {

    return res.status(400).send(`${currentUser} does not have access`);
  }

  urlDatabase[rShortURL] = { longURL: req.body.longURL, userID: req.session['user_id'] }; // updates database

  res.redirect(302, `/urls/${rShortURL}`); // redirects to the result
});

app.post('/login', (req, res) => { // posts result of login form submit into cookie handles errors
  if (!req.body.email || !req.body.password) {
    return res.status(400).send('Email address or password missing');
  }

  let foundUser = getUserByEmail(req.body.email, userDB);
  
  if (!foundUser) {
    return res.status(403).send('No user with that email found');
    
  }
  
  const hashedPass = userDB[foundUser.id]['password'];

  if (!bcrypt.compareSync(req.body.password, hashedPass)) {
    return res.status(403).send('Incorrect password');
  }

  req.session['user_id'] = foundUser.id;
  res.redirect('/urls');
});

app.delete('/logout', (req, res) => { // logs user out of current session
  req.session['user_id'] = null;
  res.redirect(`/login`);
});

app.post('/register', (req, res) => { // posts result of register form and updates databases
  const newID = generateRandomString();
  const hashedPass = bcrypt.hashSync(req.body.password, 10);

  if (!req.body.email || !req.body.password) {
    return res.status(400).send('Email address or password missing');
  }
  
  let foundUser = getUserByEmail(req.body.email, userDB);

  if (foundUser) {
    return res.status(400).send('Email address already in use');
  }

  userDB[newID] = {
    id: newID,
    email: req.body.email,
    password: hashedPass
  };

  req.session['user_id'] = newID;
  res.redirect(`/urls`);
});

app.put('/urls/:shortURL', (req, res) => { //responds to the post request made by edit button on /urls, updates databes
  const currentUser = isLoggedIn(req.session['user_id'], userDB);

  if (!req.session['user_id'] || req.session['user_id'] !== urlDatabase[req.params.shortURL]['userID']) {

    return res.status(400).send(`${currentUser} does not have access to this URL`);

  } else {
    urlDatabase[req.params.shortURL]['longURL'] = req.body.newURL;

    res.redirect(`/urls`);
  }
});

app.post('/urls/:shortURL/delete', (req, res) => { //responds to the post request made by delete button on /urls, updates databes
  const currentUser = isLoggedIn(req.session['user_id'], userDB);

  if (!req.session['user_id'] || req.session['user_id'] !== urlDatabase[req.params.shortURL]['userID']) {
    return res.status(400).send(`${currentUser} does not have access to this URL and cannot delete it!`);

  } else {
    delete urlDatabase[req.params.shortURL];
    res.redirect(`/urls`);
  }
});

app.listen(PORT, () => {
  console.log(`TinyApp listening on port ${PORT}!`);
});