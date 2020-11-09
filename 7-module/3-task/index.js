export default class StepSlider {
  get elem() {
    return this._elem;
  }
  constructor(inputData) {
    this.config = inputData;
    this.value = inputData.value;
    if (!this.value) {
      this.value = 0;
    }
    this._elem = document.createElement('div');
    this._elem.classList.add('slider');
    this.render(this.config);
    this.onClick();
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


  onClick() {
    let slider = this._elem;
    let steps = this.config.steps;
    let value = this.value;
    let textValue = this._elem.querySelector('.slider__value');
    textValue.textContent = value;

    let segments = steps - 1;
    let thumb = slider.querySelector('.slider__thumb');
    let progress = slider.querySelector('.slider__progress');
    let valuePercents = value / segments * 100;
    let leftPercents = valuePercents;
    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;
    let spans = this._elem.querySelectorAll('.slider__steps > span');
    spans[value].classList.add('slider__step-active');

    function catchPosition(event) {
      //переписываем свойстава ширины закрашенной области и положения кубика
      let left = event.clientX - slider.getBoundingClientRect().left;
      let leftRelative = left / slider.offsetWidth;
      let approximateValue = leftRelative * segments;
      value = Math.round(approximateValue);
      textValue.textContent = value;
      valuePercents = value / segments * 100;
      leftPercents = valuePercents;
      thumb.style.left = `${leftPercents}%`;
      progress.style.width = `${leftPercents}%`;
      //проверка на наличие класса
      let activeSpan = document.querySelector('.slider__step-active');
      if (activeSpan) {
        activeSpan.classList.remove('slider__step-active');
      }
      spans[value].classList.add('slider__step-active');

      //генерируем событие на слайдер
      slider.dispatchEvent(
        new CustomEvent('slider-change', {
          detail: value,
          bubbles: true
        }));
    }

    //наконец-то вешаем клик-прослушку на слайдер
    this._elem.addEventListener('click', catchPosition);
  }
}
