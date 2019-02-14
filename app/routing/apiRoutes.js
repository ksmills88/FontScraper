// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on all possible friends
// ===============================================================================

var websites = require("../data/website");

// ===============================================================================
// ROUTING
// ===============================================================================
const cheerio = require('cheerio')
const request = require('request')
const minimalcss = require('minimalcss');


let URL = process.argv[2]
const separator = `\n=======================================================================\n`
let cleanURL = `${separator}Gathering fonts from:\n\n${URL}`

var websiteData = {
  url: URL,
  title: "",
  fonts: []
};


// check the URL to make sure it is valid
if(!URL){
  URL= "https://www.webflow.com"
  
  console.log(`${separator}Gathering fonts from:\n\n${URL}`)
  scrapeTitle()
  runCSS()
  websiteData.url = URL
  console.log("this is the siteData inside IF")
  console.log(websiteData)
  websites.push(websiteData)
  console.log("data pushed")

} else {
  if(validateUrl(URL)=== false){
      console.log(`${separator}invalid URL, try again${separator}`)
  } else {
      console.log(cleanURL)
      scrapeTitle()
      runCSS()

      websites.push(websiteData)

  }
}



function scrapeTitle() {
  // set up scrape of specific URL using Cheerio.js
  request({
      method: 'GET',
      url: URL
  }, (err, res, body) => {
      if (err) return console.error(err);
      //loads the entire body
      let $ = cheerio.load(body);
      //searches the element: title to get the text
      let title = $('title');
      websiteData.title = title.text()
      console.log("this is the websiteData inside scrapeTitle")
      console.log(websiteData.title)

      // console.log(siteData)
      // console.log(`\n${title.text()} ${separator}`);
  });
}

// Checks to make sure the URL given is valid 
function validateUrl(value) {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
}

// Adds values to given array only if the array doesn't already include that value
function add(array, value) {
  if (array.indexOf(value) === -1) {
    array.push(value);
  }
}

// Runs the minimal CSS function to get all CSS from the URL.
// CSS is then parsed and split to pull font-family info only by then splitting on ;
// Checks for special characters to get simplified font data and log them in a list
function runCSS(){
  minimalcss
  .minimize({ urls: [URL] })
  .then(result => {
      // console.log('OUTPUT', result.finalCss);
      // myJson = JSON.stringify(result.finalCss)
      splitFull = result.finalCss.split('font-family:')
      // console.log(splitFull)
      var fonts = []
      for (var i=1;i<splitFull.length;i++){
          //split on ; and capture i[0] in new for loop to send to fonts array]
          var font = splitFull[i].split(';')
          // console.log(font[0])
          if(font[0].includes('}')){
              //if result includes end curly brace, split on curly brace to target only items inside of font-family
              var f = font[0].split('}')

              add(fonts, f[0].replace(/'/g, '').replace(/"/g, ''))
          } else {
              add(fonts, font[0].replace(/'/g, '').replace(/"/g, ''))
          }
      }
      websiteData.fonts = fonts
      if(fonts.length > 0){
          console.log(`*** RESULTS ***\n`)
          // websiteData.fonts.push(fonts[m])
          for (var m=0; m<fonts.length; m++){
           console.log(fonts[m])
          }
          console.log(`\n`)

          // console.log(`${fonts}\n`)
      } else {
          console.log("No results found")
      }
  })
  .catch(error => {
      console.error(`Failed the minimize CSS: ${error}`);
  });
}





module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------



  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // ---------------------------------------------------------------------------

  app.post("/api/websites", function(req, res) {
    // Note the code here. Our "server" will respond to a user"s survey result
    // Then compare those results against every user in the database.
    // It will then calculate the difference between each of the numbers and the user"s numbers.
    // It will then choose the user with the least differences as the "best friend match."
    // In the case of multiple users with the same result it will choose the first match.
    // After the test, it will push the user to the database.

    // We will use this object to hold the "best match". We will constantly update it as we
    // loop through all of the options
    var siteData = {
      name: "website",
      fonts: "Times New Roman"
    };

    // Here we take the result of the user"s survey POST and parse it.
    var userData = req.body;
    // Finally save the user's data to the database (this has to happen AFTER the check. otherwise,
    // the database will always return that the user is the user's best friend).
    websites.push(siteData);

    // Return a JSON with the user's bestMatch. This will be used by the HTML in the next page
    res.json(bestMatch);
  });

  app.get("/api/websites", function(req, res) {
    // var siteData = {
    //   name: "website",
    //   fonts: "Times New Roman"
    // };
    // websites.push(siteData);

    res.json(websites);
  });
};
