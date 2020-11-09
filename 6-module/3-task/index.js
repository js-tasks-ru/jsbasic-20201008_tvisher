import createElement from '../../assets/lib/create-element.js';

export default class Carousel {

  get elem() {
    return this._elem;
  }

  constructor(slides) {
    this.slides = slides;
    this._elem = document.createElement("div");
    this._elem.classList.add("carousel");
    this.render(slides);
    this._elem.addEventListener("click", (event) => this.onClick(event));
    this.initCarousel();
  }
  //перерабатываем входные данные в вёрстку и вставляем её в HTML элемент _elem
  render(dataIn) {

    let arrows = `<div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>`;
    this._elem.insertAdjacentHTML('afterbegin', arrows);

    let slideRow = dataIn.map((item) => {
      return `<div class="carousel__slide" data-id="${item.id}">
      <img src="/assets/images/carousel/${item.image}" class="carousel__img" alt="slide">
      <div class="carousel__caption">
        <span class="carousel__price">€${item.price.toFixed(2)}</span>
        <div class="carousel__title">${item.name}</div>
        <button type="button" class="carousel__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    </div>`;
    }).join('');

    let sliderBody = document.createElement("div");
    sliderBody.classList.add("carousel__inner");

    sliderBody.insertAdjacentHTML('afterbegin', slideRow);
    this._elem.append(sliderBody);

  }
  //метод для генерации пользовательского события при нажатии на кнопку +
  onClick(event) {
    if (event.target.closest('.carousel__button')) {
      this._elem.dispatchEvent(
        new CustomEvent("product-add", {
          detail: event.target.closest('.carousel__slide').dataset.id,
          bubbles: true
        }))
    }
  }
  // метод отвечающий за перелистывание слайдов
  initCarousel() {
    let leftArrow = this._elem.querySelector('.carousel__arrow_left');
    let rightArrow = this._elem.querySelector('.carousel__arrow_right');
    let slider = this._elem.querySelector('.carousel__inner');
    let slide = this._elem.querySelectorAll('.carousel__slide');
    let shift = 0;
    let width;
    leftArrow.style.display = 'none';
    rightArrow.onclick = () => {
      width = slider.offsetWidth;
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
      width = slider.offsetWidth;
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

}
