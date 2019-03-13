const fs = require('fs');
const Photo = require('./photo.class');

function parseFile(selectedInput) {
  let inputFile;
  fs.readdirSync(__dirname + '/../input/').forEach(filename => {
    if(filename.indexOf(selectedInput) === 0) {
      inputFile = filename.replace('.txt', '');
    }
  });

  if(!inputFile) {
    console.log('No input file');
    process.exit(0);
  }

  let content = fs.readFileSync(__dirname + '/../input/' + inputFile + '.txt', {encoding: 'ascii'});
  let lines = content.split('\n');

  let currentRow = 0;

  params = lines[currentRow].split(' ');
  photosNumber = parseInt(params[0]);
  
  currentRow++;

  const photos = [];

  let id = 0;
  for(; currentRow <= photosNumber; currentRow++) {
    params = lines[currentRow].split(' ');
    let tags = [];
    for (let i = 0; i < params[1]; i++) {
      let currentTag = params[i + 2];

      let numericTag = "";
      for (let x = 0; x < currentTag.length; x++) {
        numericTag += (currentTag.charCodeAt(x) - 30).toString();
      }
      numericTag = parseInt(numericTag);
      tags.push(numericTag);
    }
    photos.push(new Photo(id, params[0], +params[1], tags));
    id++;
  }

  return { filename: inputFile, selectedInput: selectedInput, photos: photos };
}

function exportSlideshow(slideshow, filename) {
  let content = "";

  content += slideshow.slides.length + "\n";
  slideshow.slides.forEach(slide => {
    let line = "";
    slide.photos.forEach(photo => {
      line += photo.id + " ";
    })
    line = line.trim();
    content += line + "\n";
  });

  fs.writeFileSync(__dirname + '/../output/' + filename + '.txt', content, {encoding: 'ascii'});
}

module.exports.parseFile = parseFile;
module.exports.exportSlideshow = exportSlideshow;
