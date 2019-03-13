const io = require('./io');
const logic = require('./logic');

let start, finish;

start = new Date().getTime();

let filename = 'e-horizontal';
let horizontalPhotos = io.readSlides(filename);

if (!horizontalPhotos) {
  filename = io.getFileName(process.argv[2]);
  verticalPhotos = io.parseFile(filename);
  slides = logic.combineVerticalPhotos(verticalPhotos);
  io.saveSlides(slides);

  filename = 'e-horizontal';
  horizontalPhotos = io.readSlides(filename);
}

const slideshow = logic.composeSlideshow(horizontalPhotos);

io.exportSlideshow(slideshow, filename);

console.log('Score: ' + slideshow.computeTotalScore());

finish = new Date().getTime();

console.log("Total time: " + (finish - start) + " ms");
