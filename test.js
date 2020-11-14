const { generateRandomString } = require("./helper_functions");

const cookieChecker = function (url, cookie, dataBase) {
  let cookieFound = false;
      for (const tags of dataBase[url]['info']) {
        if (tags[1] === cookie) {
          cookieFound = true;
        }
      }
  return cookieFound;
}

const infoTagger = function (url, id, dataBase) {
  const visitorID = generateRandomString();
  dataBase[url]['info'].push([new Date().toString().slice(0, 24), id, visitorID])
}

const visitorObjMaker = function(url, dataBase) {
  if (!dataBase[url]) {
    dataBase[url] = {
      visits: 0,
      uniqueVisits: 0,
      info: []
    }
  }
};

const visitorDB = {
  'exShortURL': {
    visits: 0,
    uniqueVisits: 0,
    info: [['2020-11-13T22:14:20.875Z', 'exvisitorID'], ['2020-12-13T22:14:20.875Z', 'exvisitorID2']]
  },
}



module.exports = { cookieChecker, infoTagger, visitorObjMaker }