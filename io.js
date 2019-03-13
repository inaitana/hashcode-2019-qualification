const fs = require('fs');
const Photo = require('./photo.class');

function getFileName(selectedInput) {
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

  return inputFile;
}

function parseFile(inputFile) {
  if (!fs.existsSync(__dirname + '/../input/' + inputFile + '.txt')) {
    return false;
  }
  let content = fs.readFileSync(__dirname + '/../input/' + inputFile + '.txt', {encoding: 'ascii'});
  let lines = content.split('\n');

  let currentRow = 0;

  params = lines[currentRow].split(' ');
  photosNumber = parseInt(params[0]);
  
  currentRow++;

  const photos = [];

  const tagsIndex = [];
  let tagId = 0;
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
      let indexedTag;
      if (tagsIndex[numericTag]) {
        indexedTag = tagsIndex[numericTag];
      } else {
        indexedTag = tagId;
        tagsIndex[numericTag] = indexedTag;
        tagId++;
      }
      tags.push(indexedTag);
    }
    photos.push(new Photo(id, params[0], +params[1], tags));
    id++;
  }

  return photos;
}

function exportSlideshow(slideshow, filename) {
  let content = "";

  content += slideshow.slides.length + "\n";
  slideshow.slides.forEach(slide => {
    slide.photos.forEach(photo => {
      content += photo.id.replace('-', ' ') + "\n";
    })
  });

  fs.writeFileSync(__dirname + '/../output/' + filename + '.txt', content, {encoding: 'ascii'});
}

function saveSlides(slides) {
  let content = "";

  content += slides.length + "\n";

  slides.forEach(slide => {
    content += "H " + slide.id + " ";
    content += slide.tags.length + " ";
    content += slide.tags.join(' ');
    content += "\n";
  });

  fs.writeFileSync(__dirname + '/../input/e-horizontal.txt', content, {encoding: 'ascii'});
}

function readSlides(inputFile) {
  if (!fs.existsSync(__dirname + '/../input/' + inputFile + '.txt')) {
    return false;
  }
  let content = fs.readFileSync(__dirname + '/../input/' + inputFile + '.txt', {encoding: 'ascii'});
  let lines = content.split('\n');

  let currentRow = 0;

  params = lines[currentRow].split(' ');
  photosNumber = parseInt(params[0]);
  
  currentRow++;

  const photos = [];

  const tagsIndex = [];
  let tagId = 0;
  for(; currentRow <= photosNumber; currentRow++) {
    params = lines[currentRow].split(' ');
    let tags = [];
    let id = params[1];
    for (let i = 0; i < params[2]; i++) {
      let currentTag = params[i + 3];

      let numericTag = "";
      for (let x = 0; x < currentTag.length; x++) {
        numericTag += (currentTag.charCodeAt(x) - 30).toString();
      }
      numericTag = parseInt(numericTag);
      let indexedTag;
      if (tagsIndex[numericTag]) {
        indexedTag = tagsIndex[numericTag];
      } else {
        indexedTag = tagId;
        tagsIndex[numericTag] = indexedTag;
        tagId++;
      }
      tags.push(indexedTag);
    }
    photos.push(new Photo(id, params[0], +params[2], tags));
    id++;
  }

  return photos;
}

module.exports.getFileName = getFileName;
module.exports.parseFile = parseFile;
module.exports.exportSlideshow = exportSlideshow;
module.exports.saveSlides = saveSlides;
module.exports.readSlides = readSlides;
