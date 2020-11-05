import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  /*пишем геттер который возвращает HTML элемент, после проведения всех манипуляций над ним*/
  get elem() {
    return this._elem;
  }

  constructor(product) {
    this._elem = document.createElement("div");
    this._elem.classList.add("card");
    this.render(product);
    this._elem.addEventListener("click", (event) => this.onClick(event, product));
  }
  // верстаем тело карточки с нужными параметрами, затем добавляем её в HTML элемент _elem
  render(dataIn) {
    let cardTop = `<div class = "card__top">
    <img src="/assets/images/products/${dataIn.image}" class="card__image" alt="product">
    <span class="card__price">€${dataIn.price.toFixed(2)}</span>
    </div>`;

    let cardBody = `<div class="card__title">${dataIn.name}</div>
    <button type="button" class="card__button">
        <img src="/assets/images/icons/plus-icon.svg" alt="icon">
    </button>`;

    this._elem.insertAdjacentHTML("afterbegin", cardTop);
    this._elem.insertAdjacentHTML("beforeend", cardBody);
  }
  /*создаём метод события, который при клике на кнопку с классом card__button,
   вешает сгенерированное событие на HTML элемент _elem.
   */
  onClick(event, dataIn) {
    if (event.target.closest('.card__button')) {
      this._elem.dispatchEvent(
        new CustomEvent("product-add", {
          detail: `${dataIn.id}`,
          bubbles: true
        }))
    }
  }
}
