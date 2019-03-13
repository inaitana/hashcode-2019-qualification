const Slide = require('./slide.class');
const Slideshow = require('./slideshow.class');

function composeSlideshow(photos, selectedInput) {
  const slideshow = new Slideshow();

  photos = sortPhotos(photos);

  let horizontalPhotos = photos.filter(photo => photo.orientation === 'H');
  let verticalPhotos = photos.filter(photo => photo.orientation === 'V');

  for (let i = 0; i < horizontalPhotos.length; i++) {
    horizontalPhotos[i].position = i;
  }
  for (let i = 0; i < verticalPhotos.length; i++) {
    verticalPhotos[i].position = i;
  }

  const startSlide = getFirstSlide(horizontalPhotos, verticalPhotos);

  deleteSlidePhotos(startSlide, horizontalPhotos, verticalPhotos);
  slideshow.addSlide(startSlide);

  let currentBestSlide;
  do {
    currentBestSlide = searchBestSlide(slideshow, horizontalPhotos, verticalPhotos, selectedInput);
    if (currentBestSlide !== null) {
      deleteSlidePhotos(currentBestSlide, horizontalPhotos, verticalPhotos);
      slideshow.addSlide(currentBestSlide);
    }
  }
  while (currentBestSlide !== null);

  return slideshow;
}

function sortPhotos(photos) {
  return photos.sort((photoA, photoB) => photoA.tagsNumber - photoB.tagsNumber);
}

function deleteSlidePhotos(slide, horizontalPhotos, verticalPhotos) {
  slide.photos.forEach(slidePhoto => {
    if (slidePhoto.orientation == 'H') {
      delete horizontalPhotos[slidePhoto.position]
    } else if (slidePhoto.orientation == 'V') {
      delete verticalPhotos[slidePhoto.position]
    }
  });
}

function getFirstSlide(horizontalPhotos, verticalPhotos) {
  const slide = new Slide();

  if (horizontalPhotos.length > 0) {
    slide.addPhoto(horizontalPhotos[0]);
  } else {
    slide.addPhoto(verticalPhotos[0]);
    slide.addPhoto(verticalPhotos[1]);
  }

  return slide;
}

function searchBestSlide(slideshow, horizontalPhotos, verticalPhotos, selectedInput) {
  let maxScore;
  if (selectedInput === 'b') {
    maxScore = 3;
  } else {
    maxScore = Math.floor(slideshow.slides[slideshow.slides.length - 1].tagsNumber / 2);
  }

  let bestHorizontal = findBestHorizontalSlide(slideshow, horizontalPhotos, maxScore);
  let bestVertical = findBestVerticalSlide(slideshow, verticalPhotos, maxScore);

  if (bestVertical === null) {
    return bestHorizontal;
  } else if (bestHorizontal === null) {
    return bestVertical;
  } else {
    if (bestVertical.score > bestHorizontal.score) {
      return bestVertical;
    } else {
      return bestHorizontal;
    }
  }
}

function findBestHorizontalSlide(slideshow, photos, maxScore) {
  let bestSlide = null;
  let bestScore = 0;

  for (let photo of photos) {
    if (photo != null) {
      let slide = new Slide();
      
      if (Math.floor(photo.tagsNumber / 2) > bestScore) {
        slide.addPhoto(photo);

        let score = slideshow.computeScoreWithLatest(slide);

        if (bestSlide === null || score > bestScore) {
          bestSlide = slide;
          bestScore = score;
          if(score >= maxScore) {
            bestSlide.score = score;
            return bestSlide;
          }
        }
      }
    }
  }

  if (bestSlide !== null) {
    bestSlide.score = bestScore;
  }

  return bestSlide;
}

function findBestVerticalSlide(slideshow, photos, maxScore) {
  let bestSlide = null;
  let bestScore = 0;

  for (let photoA of photos) {
    if (photoA != null) {
      let slide = new Slide();
      if (Math.floor(photoA.tagsNumber / 2) > bestScore) {
        slide.addPhoto(photoA);

        let score = slideshow.computeScoreWithLatest(slide);
        if (bestSlide === null || score > bestScore) {
          bestSlide = slide;
          bestScore = score;
          if(score >= maxScore) {
            break;
          }
        }
      }
    }
  }

  if (bestSlide === null) {
    return null;
  }

  const bestPhotoA = bestSlide.photos[0];

  let bestPhotoB = null;

  for (let photoB of photos) {
    if (photoB != null && bestPhotoA.id != photoB.id) {
      const slide = new Slide();
      slide.addPhoto(bestPhotoA);
      slide.addPhoto(photoB);
      
      if (bestPhotoB === null || Math.floor(slide.tagsNumber / 2) > bestScore) {
        let score = slideshow.computeScoreWithLatest(slide);

        if (bestPhotoB === null || score > bestScore) {
          bestPhotoB = photoB;
          bestScore = score;
          if(score >= maxScore) {
            break;
          }
        }
      }
    }
  }

  if (bestPhotoB !== null) {
    bestSlide.addPhoto(bestPhotoB);  
    bestSlide.score = bestScore;
  }

  return bestSlide;
}

module.exports.composeSlideshow = composeSlideshow;
