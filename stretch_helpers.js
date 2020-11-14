const { generateRandomString } = require("./helper_functions");

const cookieChecker = function(url, cookie, dataBase) { // used to determine if access to url is by unique user by checking if their info is in visitorDB
  let cookieFound = false;
  for (const tags of dataBase[url]['info']) {
    if (tags[1] === cookie) {
      cookieFound = true;
    }
  }
  return cookieFound;
};

const infoTagger = function(url, id, dataBase) { //used to tag information each time a url is used, name who used it and end, adds info to visitorDB
  const visitorID = generateRandomString();
  dataBase[url]['info'].push([new Date().toString().slice(0, 24), id, visitorID]);
};

const visitorObjMaker = function(url, dataBase) { // used to initialize a visitor object when a new url is created
  if (!dataBase[url]) {
    dataBase[url] = {
      visits: 0,
      uniqueVisits: 0,
      info: []
    };
  }
};


module.exports = { cookieChecker, infoTagger, visitorObjMaker };