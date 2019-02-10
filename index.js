const minimalcss = require('minimalcss');
const separator = `\n============================================================\n`
let URL = process.argv[2]
let cleanURL = `${separator}Gathering fonts from:\n\n${URL}${separator}`
function validateUrl(value) {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
}
// error handling
// check the URL to make sure it is valid
if(!URL){
    URL= "https://www.webflow.com"
    console.log(`${separator}Gathering fonts from:\n\n${URL}${separator}`)
    runCSS()
} else {
    if(validateUrl(URL)=== false){
        console.log(`${separator}invalid URL, try again${separator}`)
    } else {
        console.log(cleanURL)
        runCSS()
    }
}
function add(array, value) {
    if (array.indexOf(value) === -1) {
      array.push(value);
    }
  }

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
            
                var f = font[0].split('}')
                // console.log(f[0])

                add(fonts, f[0])
                // fonts.push(f[0])
            } else {
                // console.log(font[0])
                add(fonts, font[0])
                // fonts.push(font[0])
            }
        }
        if(fonts.length > 0){
            console.log(`***Results***\n`)

            for (var m=0; m<fonts.length; m++){
             console.log(fonts[m])
            }

            // console.log(`${fonts}\n`)
        } else {
            console.log("No results found")
        }
    })
    .catch(error => {
        console.error(`Failed the minimize CSS: ${error}`);
    });
}
