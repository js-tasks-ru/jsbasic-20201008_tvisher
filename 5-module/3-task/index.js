function initCarousel() {
  let leftArrow = document.querySelector('.carousel__arrow_left');
  let rightArrow = document.querySelector('.carousel__arrow_right');
  let slider = document.querySelector('.carousel__inner');
  let slide = document.querySelectorAll('.carousel__slide');
  let shift = 0;
  let width = slider.offsetWidth;
  leftArrow.style.display = 'none';
  rightArrow.onclick = () => {
    shift += width;
    slider.style.transform = `translateX(-${shift + 'px'})`;
    if (shift > 0) {
      leftArrow.style.display = '';
    }
    if (shift == width * (slide.length - 1)) {
      rightArrow.style.display = 'none';
    }
  }

  leftArrow.onclick = () => {
    shift -= width;
    slider.style.transform = `translateX(-${shift + 'px'})`;
    if (shift == 0) {
      leftArrow.style.display = 'none';
    }
    if (shift < width * (slide.length - 1)) {
      rightArrow.style.display = '';
    }
  }
}
