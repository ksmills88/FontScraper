const cheerio = require('cheerio')
const request = require('request');
const {detectFont, supportedFonts} = require('detect-font');

let URL = process.argv[2] + '/assets/css/style.css'

if(!URL){
    URL= "https://www.google.com"
}
console.log(URL)

// set up scrape of specific URL using Cheerio.js
// request({
//     method: 'GET',
//     url: URL
// }, (err, res, body) => {
//     if (err) return console.error(err);
//     //loads the entire body
//     let $ = cheerio.load(body);
    
//     //searches the element: title to get the text
//     let title = $('title');
//     console.log(title.text());

//     let style = $('style').children();
//     // style.children().first()
//     console.log(style)

//     let fonts = $('p').attr()
//     console.log(fonts.style)

//     // var obj = css.parse('body { font-size: 12px; }');
//     // console.log(css.stringify(obj));

//     var linkHrefs = $('link').map(function(i) {
//         return $(this).attr('href');
//       }).get();
//       var scriptSrcs = $('script').map(function(i) {
//         return $(this).attr('src');
//       }).get();

//       console.log("links:");
//       console.log(linkHrefs);
//       console.log("scripts:");
//       console.log(scriptSrcs);

// });

request(URL, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(body);
    console.log(body)
    var linkHrefs = $('link').map(function(i) {
      return $(this).attr('href');
    }).get();
    var scriptSrcs = $('*').children().map(function(i) {
      return (
        $(this).attr('style')
        // $(this).nextAll().attr('style')
        )
    }).get();


    // console.log("links:");
    // console.log(linkHrefs);
    // console.log("scripts:");
    // console.log(scriptSrcs);

  }
});