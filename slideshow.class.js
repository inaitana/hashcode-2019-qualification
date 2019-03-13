class Slideshow {
  constructor() {
    this.slides = [];
    this.score = 0;
  }

  addSlide(slide) {
    if (this.slides.length > 0) {
      this.score += this.computeScoreWithLatest(slide);
//      console.log(this.slides.length + ' - ' + this.score);
    }

    slide.tags = slide.tags.sort((a, b) => a - b);

    this.slides.push(slide);
    slide.photos.forEach(photo => photo.slide = slide);
  }

  computeScore(slideA, slideB) {
    let commonTagsNumber = slideB.tags.filter(tag => this.searchTag(slideA.tags, tag)).length;

    return Math.min(commonTagsNumber, slideA.tagsNumber - commonTagsNumber, slideB.tagsNumber - commonTagsNumber);
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

  computeScoreWithLatest(slide) {
    return this.computeScore(this.slides[this.slides.length - 1], slide);
  }

  computeTotalScore() {
    let totalScore = 0;

    for (let i = 1; i < this.slides.length; i++) {
      totalScore += this.computeScore(this.slides[i - 1], this.slides[i]); 
    }

    return totalScore;
  }
}

module.exports = Slideshow;
