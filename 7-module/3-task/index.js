export default class StepSlider {
  get elem() {
    return this._elem;
  }
  constructor(inputData) {
    this.steps = inputData.steps;
    this.config = inputData;
    this.value = inputData.value;
    if (!this.value) {
      this.value = 0;
    }
    this._elem = document.createElement('div');
    this._elem.classList.add('slider');
    this.render(this.config);
    this.zeroPosition();
    this.addEventListeners();
  }

  //верстаем слайдер по образу и подобию необходимого)
  render(config) {
    let sliderThumb = `<div class="slider__thumb"><span class="slider__value"></span></div>`;
    this._elem.insertAdjacentHTML("beforeend", sliderThumb);

    let sliderProgress = `<div class="slider__progress"></div>`;
    this._elem.insertAdjacentHTML("beforeend", sliderProgress);

    let sliderSteps = `<div class="slider__steps"></div>`;
    this._elem.insertAdjacentHTML("beforeend", sliderSteps);

    for (let i = 0; i < config.steps; i++) {
      this._elem.querySelector('.slider__steps').insertAdjacentHTML("beforeend", `<span></span>`);
    }
  }

  zeroPosition() {
    this.textValue = this._elem.querySelector('.slider__value');
    this.textValue.textContent = this.value;
    let segments = this.steps - 1;
    this.thumb = this._elem.querySelector('.slider__thumb');
    this.progress = this._elem.querySelector('.slider__progress');
    let valuePercents = this.value / segments * 100;
    this.thumb.style.left = `${valuePercents}%`;
    this.progress.style.width = `${valuePercents}%`;
    this.spans = this._elem.querySelectorAll('.slider__steps > span');
    this.spans[this.value].classList.add('slider__step-active');
  }



  onClick = (event) => {
    //переписываем свойстава ширины закрашенной области и положения кубика
    let left = event.clientX - this._elem.getBoundingClientRect().left;
    let leftRelative = left / this._elem.offsetWidth;
    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    this.value = Math.round(approximateValue);
    this.textValue.textContent = this.value;
    let valuePercents = this.value / segments * 100;
    this.thumb.style.left = `${valuePercents}%`;
    this.progress.style.width = `${valuePercents}%`;
    //проверка на наличие класса
    let activeSpan = document.querySelector('.slider__step-active');
    if (activeSpan) {
      activeSpan.classList.remove('slider__step-active');
    }
    this.spans[this.value].classList.add('slider__step-active');
    //генерируем событие на слайдер
    this._elem.dispatchEvent(
      new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      }));
  }

  addEventListeners() {
    this._elem.addEventListener('click', this.onClick);
  }
}
