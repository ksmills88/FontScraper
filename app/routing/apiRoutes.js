// loads data array
var websites = require("../data/website");

// Dependencies
const cheerio = require('cheerio')
const request = require('request')
const minimalcss = require('minimalcss');

module.exports = function(app) {

  app.get("/api/websites/:url", function(req, res) {
    URL = `https://${req.params.url}`;

    // sends the resulting data object to the route
    r=(data)=>{
      res.json(data)
    }
    runCSS(URL, scrapeTitle, r)
  });

  app.get("/api/websites/", function(req, res) {
      res.send(websites)
  })
  
};

// Scrapes the title from the body response of given URL
// adds the title to the object
function scrapeTitle(url, object) {
  request({
      method: 'GET',
      url: url
  }, (err, res, body) => {
      if (err) return console.error(err);
      let $ = cheerio.load(body);
      let title = $('title');
      object.title = title.text()
  });
}

// Checks to make sure the URL given is valid. Currently includes 'https' 
function validateUrl(value) {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
}

// Adds values to given array only if the array doesn't already include that value
function add(array, value) {
  if (array.indexOf(value) === -1) {
    array.push(value);
  }
}
// Only adds the object to the external array of site data if not already in array.
function addObject(array, object) {
  var included = false
  for (var i=0; i<array.length; i++) {
    if (array[i].url === object.url) {
      included=true
    }
  }
  if (!included) {
    array.push(object);
  }
}

// Runs the minimal CSS function to get all CSS from the URL.
// CSS is then parsed and split to pull font-family info.
// Checks for special characters to get simplified font data and log them in a list
// require a callback to do all of the scrape logic in the same function.
function runCSS(url, callback, funct){
  var URL = url
  var object = {}
  object.url = URL
  callback(URL, object)
  minimalcss
  .minimize({ urls: [URL] })
  .then(result => {
      //split the data-string on font-family
      splitFull = result.finalCss.split('font-family:')
      var fonts = []
      for (var i=1;i<splitFull.length;i++){
        //split on ; and capture i[0] in new for loop to send to fonts array]
        var font = splitFull[i].split(';')
        //before sending to font array, check for bracket
        if(font[0].includes('}')){
            var f = font[0].split('}')
            // adds font, gets rid of any ' or " present within array
            add(fonts, f[0].replace(/'/g, '').replace(/"/g, ''))
        } else {
            add(fonts, font[0].replace(/'/g, '').replace(/"/g, ''))
        }
      }
      if(fonts.length > 0){
        console.log(`\nYAY, SUCCESS! Follow the link below to see the results:`)
        console.log(`http://localhost:8080/api/websites`)
        object.fonts = fonts
      } else {
        console.log(`\nSORRY, no font-families were gathered from ${URL}.\nTry another URL if you'd like.\nSee what data we did gather by following the link below:`)
        console.log(`http://localhost:8080/api/websites`)
        object.fonts = "Sorry, no fonts were found"
      }
      funct(object)
      // websites.push(object)
      addObject(websites, object)
  })
  .catch(error => {
      console.error(`Failed the minimize CSS: ${error}`);
  });
}

