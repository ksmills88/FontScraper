const minimalcss = require('minimalcss');
const cheerio = require('cheerio')
const request = require('request')

const separator = `\n=======================================================================\n`
let URL = process.argv[2]
let cleanURL = `${separator}Gathering fonts from:\n\n${URL}`

// check the URL to make sure it is valid
if(!URL){
    URL= "https://www.webflow.com"
    console.log(`${separator}Gathering fonts from:\n\n${URL}`)
    scrapeTitle()
    runCSS()
} else {
    if(validateUrl(URL)=== false){
        console.log(`${separator}invalid URL, try again${separator}`)
    } else {
        console.log(cleanURL)
        scrapeTitle()
        runCSS()
    }
}
// Scrapes the Title from the body of a URL using request and cheerio
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
        console.log(`\n${title.text()} ${separator}`);
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
        if(fonts.length > 0){
            console.log(`*** RESULTS ***\n`)

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
