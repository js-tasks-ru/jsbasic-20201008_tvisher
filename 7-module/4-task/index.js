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
    this.onClickAndDrag();
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


  onClickAndDrag() {
    //получаем необходимые данные для работы и назначаем положение ползунка по умолчанию
    let slider = this._elem;
    let steps = this.config.steps;
    let value = this.value;
    let thumb = slider.querySelector('.slider__thumb');
    let progress = slider.querySelector('.slider__progress');
    let textValue = this._elem.querySelector('.slider__value');
    textValue.textContent = value;
    let segments = steps - 1;
    let valuePercents = value / segments * 100;
    let leftPercents = valuePercents;
    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;
    let spans = this._elem.querySelectorAll('.slider__steps > span');
    spans[value].classList.add('slider__step-active');



    /* Функция для события onclick.
     Переписываем свойстава ширины закрашенной области и положения ползунка при нажатии*/
    function catchPosition(event) {
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

      slider.dispatchEvent(
        new CustomEvent('slider-change', {
          detail: value,
          bubbles: true
        }));
    }
    // вешаем клик-прослушку на слайдер
    this._elem.addEventListener('click', catchPosition);


    // отменяем браузерный Drag'n'Drop
    thumb.ondragstart = function () {
      return false;
    };

    // вешаем на документ просшуку события pointerdown
    document.addEventListener('pointerdown', (event) => {
      // если нажатие было не на ползунке - событие не сработает
      if (!event.target.closest('.slider__thumb')) {
        return false;
      }

      //функция динамически вычисляет положение ползунка и ширину закрашенной области
      function onMove(event) {
        slider.classList.add('slider_dragging');
        let left = event.clientX - slider.getBoundingClientRect().left;
        let leftRelative = left / slider.offsetWidth;
        if (leftRelative < 0) {
          leftRelative = 0;
        }
        if (leftRelative > 1) {
          leftRelative = 1;
        }
        let approximateValue = leftRelative * segments;
        value = Math.round(approximateValue);
        textValue.textContent = value;
        let leftPercents = leftRelative * 100;
        thumb.style.left = `${leftPercents}%`;
        progress.style.width = `${leftPercents}%`;
        let activeSpan = document.querySelector('.slider__step-active');
        if (activeSpan) {
          activeSpan.classList.remove('slider__step-active');
        }
        spans[value].classList.add('slider__step-active');
      }

      // вешаем на документ прослушку события pointermove
      document.addEventListener('pointermove', onMove);

      // вешаем на документ прослушку события pointerup
      document.onpointerup = function (event) {
        /*если ЛКМ была отпущена не на ползунке и за пределами слайдера,
         повторно вычисляем ширину закрашенной области и положение ползунка*/
        let left = event.clientX - slider.getBoundingClientRect().left;
        let leftRelative = left / slider.offsetWidth;
        if (leftRelative < 0) {
          leftRelative = 0;
        }
        if (leftRelative > 1) {
          leftRelative = 1;
        }
        let approximateValue = leftRelative * segments;
        value = Math.round(approximateValue);
        textValue.textContent = value;
        valuePercents = value / segments * 100;
        leftPercents = valuePercents;
        thumb.style.left = `${leftPercents}%`;
        progress.style.width = `${leftPercents}%`;
        //удаляем класс slider_dragging
        slider.classList.remove('slider_dragging');

        //вешаем пользовательское событие в момент отпуска ЛКМ

        slider.dispatchEvent(
          new CustomEvent('slider-change', {
            detail: value,
            bubbles: true
          }));

        //удаляем прослушку движения мыши
        document.removeEventListener('pointermove', onMove);
        //удаляем прослушку отпускания ЛКМ
        document.onpointerup = null;

      }
    });

  }
}
