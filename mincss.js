const minimalcss = require('minimalcss');

minimalcss
  .minimize({ urls: ['https://webflow.com/'] })
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
            fonts.push(f[0])
        } else {
            // console.log(font[0])
            fonts.push(font[0])
        }

    }
    console.log(fonts)




  })
  .catch(error => {
    console.error(`Failed the minimize CSS: ${error}`);
  });