class Photo {
  constructor(id, orientation, tagsNumber, tags) {
    this.id = id;
    this.orientation = orientation;
    this.tagsNumber = tagsNumber;
    this.slide = null;
    this.tags = tags.sort((a, b) => a - b);
  }

  getTagsSumWithPhoto(photo) {
    let sum;
    if (this.tagsNumber > photo.tagsNumber) {
      sum = this.tags.slice();
      photo.tags.forEach(tag => {
        if (!this.searchTag(sum, tag)) {
          sum.push(tag);
        }
      });
    } else {
      sum = photo.tags.slice();
      this.tags.forEach(tag => {
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

module.exports = Photo;