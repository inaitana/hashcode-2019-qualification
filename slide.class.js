class Slide {
  constructor() {
    this.photos = [];
    this.tags = [];
    this.tagsNumber = 0;
  }
  
  addPhoto(photo) {
    if (this.photos.length === 0) {
      this.tags = photo.tags;
      this.tagsNumber = photo.tagsNumber;
    } else {
      this.tags = this.getPhotosTagsSum(this.photos[0], photo);
      this.tagsNumber = this.tags.length;
    }

    this.photos.push(photo);

    return true;
  }

  getPhotosTagsSum(photoA, photoB) {
    let sum;
    if (photoA.tagsNumber > photoB.tagsNumber) {
      sum = photoA.tags.slice(0);
      photoB.tags.forEach(tag => {
        if (!this.searchTag(sum, tag)) {
          sum.push(tag);
        }
      });
    } else {
      sum = photoB.tags.slice(0);
      photoA.tags.forEach(tag => {
        if (!this.searchTag(sum, tag)) {
          sum.push(tag);
        }
      });
    }
    return sum;
  }

  searchTag(tags, findTag) {
    for (let tag of tags) {
      if (tag === findTag) {
        return true;
      } else if (tag > findTag) {
        return false;
      }
    }

    return false;
  }
}

module.exports = Slide;
