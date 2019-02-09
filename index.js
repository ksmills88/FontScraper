const cheerio = require('cheerio')
const request = require('request');

let URL = process.argv[2]

if(!URL){
    URL= "https://www.google.com"
}
console.log(URL)

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
    console.log(title.text());

    let fonts = $('p').attr()
    console.log(fonts.style)

    let contents = $('body').children().first().text()
    // console.log(contents.length)
    // console.log(contents)
 

});
