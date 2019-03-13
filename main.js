const io = require('./io');
const logic = require('./logic');

let start, finish;

start = new Date().getTime();

data = io.parseFile(process.argv[2]);

parsed = new Date().getTime();

console.log("Parsing time: " + (parsed - start) + " ms");

const slideshow = logic.composeSlideshow(data.photos, data.selectedInput);

io.exportSlideshow(slideshow, data.filename);

finish = new Date().getTime();

console.log('Score: ' + slideshow.computeTotalScore());

console.log("Total time: " + (finish - start) + " ms");
