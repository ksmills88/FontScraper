// loads data array
var websites = require("../data/website");

// Dependencies
const cheerio = require('cheerio')
const request = require('request')
const minimalcss = require('minimalcss');

let URL = process.argv[2]
let cleanURL = `\nGathering information from:\n${URL}\nThis may take a few seconds...\n`

let websiteData = {
  url: URL,
  title: "",
  fonts: []
};

module.exports = function(app) {
  // checkForFonts = () => {
  //   app.get("/api/websites/:url")
  //   console.log("Checked")
    

  // }

  app.get("/api/websites/:url", function(req, res) {
    URL = `https://${req.params.url}`;
    websiteData.url = URL
    console.log(URL)
    scrapeTitle()
    runCSS()
    if(websiteData.fonts.length === 0){
      res.send('Loading...Please wait a few seconds, then refresh!')
      console.log(res.status)
    } else{
      res.send(websiteData)
    }

    // res.send(websiteData)

      // app.get("/api/websites/:url", function(req, res) {
      //   URL = `https://${req.params.url}`;
      //   console.log(URL)
      //   scrapeTitle()
      //   runCSS()
      //   .then(function(data){
      //     res.send(data)
      //   })
      // })
  });
  app.get("/api/websites/", function(req, res) {
    res.send(websites)
  })

};

// check the URL to make sure it is valid. 
// Set default if no URL provided, and throw error message if URL is invalid.
// Otherwise, run code with given valid URL
// if(!URL){
//   URL= "https://www.webflow.com"
//   console.log(`\nGathering information from:\n${URL}\nThis may take a few seconds...\n`)
//   scrapeTitle()
//   runCSS()
//   // Need to set URL to this default - otherwise, URL does not get added to JSON data
//   websiteData.url = URL
//   // Once data is gathered and assigned, push the data to the data array that will get sent to the API endpoint
//   websites.push(websiteData)
// } else {
//   if(validateUrl(URL)=== false){
//       console.log(`invalid URL, try again`)
//   } else {
//       console.log(cleanURL)
//       scrapeTitle()
//       runCSS()
//       // Once data is gathered, push the data to the data array that will get sent to the API endpoint
//       websites.push(websiteData)

//   }
// }

// Scrape the title from the body response of given URL
function scrapeTitle() {
  request({
      method: 'GET',
      url: URL
  }, (err, res, body) => {
      if (err) return console.error(err);
      //loads the entire body
      let $ = cheerio.load(body);
      //searches the element: title to get the text
      let title = $('title');
      //sets the title in the globally defined websiteData object
      websiteData.title = title.text()
  });
}

// Checks to make sure the URL given is valid. Must include 'https' 
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
// CSS is then parsed and split to pull font-family info ONLY by .then splitting on ;
// Checks for special characters to get simplified font data and log them in a list

function runCSS(){
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
      //sets the fonts array in the globally defined websiteData object
      websiteData.fonts = fonts
      if(fonts.length > 0){
        console.log(`\nYAY, SUCCESS! Follow the link below to see the results:`)
        console.log(`http://localhost:8080/api/websites`)
        // terminal output for CLI only app:
        // console.log(`*** RESULTS ***\n`)
        // for (var m=0; m<fonts.length; m++){
        //  console.log(fonts[m])
        // }
      } else {
        console.log(`\nSORRY, no font-families were gathered from ${URL}.\nTry another URL if you'd like.\nSee what data we did gather by following the link below:`)
        console.log(`http://localhost:8080/api/websites`)

      }
  })
  .catch(error => {
      console.error(`Failed the minimize CSS: ${error}`);
  });
}

// module.exports = function(app) {

//   app.get("/api/websites/:url", function(req, res) {
//     URL = req.params.url;
//     console.log(URL)
//     runCSS()
//     // Once data is gathered, push the data to the data array that will get sent to the API endpoint
//     websites.push(websiteData)
//     console.log(websiteData)


//     res.json(websites);
//   });
// };
