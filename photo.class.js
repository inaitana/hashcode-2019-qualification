class Photo {
  constructor(id, orientation, tagsNumber, tags) {
    this.id = id;
    this.orientation = orientation;
    this.tagsNumber = tagsNumber;
    this.slide = null;
    this.tags = tags.sort((a, b) => a - b);
  }
}
  
module.exports = Photo;