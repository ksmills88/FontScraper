const minimalcss = require('minimalcss');

minimalcss
  .minimize({ urls: ['https://dijatek.com/'] })
  .then(result => {
    // console.log('OUTPUT', result.finalCss);
    // myJson = JSON.stringify(result.finalCss)
    splitFull = result.finalCss.split('font-family:')
    // console.log(splitFull)
    var fonts = []
    for (var i=1;i<2;i++){
        //split on ; and capture i[0] in new for loop to send to fonts array]
        var font = splitFull[i].split(';')
        console.log(font)
    }

  })
  .catch(error => {
    console.error(`Failed the minimize CSS: ${error}`);
  });