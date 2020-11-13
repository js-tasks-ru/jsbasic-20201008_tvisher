import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  get elem() {
    return this._elem;
  }
  constructor(products) {
    this.products = products;
    this.filters = {};
    this._elem = document.createElement('div');
    this._elem.classList.add("products-grid");
    this.render(products);
    this.dataInCard(products);
  }

  render(dataIn) {
    //метод выполнящий отрисовку карточек товара
    this._elem.insertAdjacentHTML("beforeend", `<div class="products-grid__inner"></div>`);
    let gridInnerContent = dataIn.map((item) => {
      return `<div class="card">
                <div class = "card__top">
                  <img src="/assets/images/products/${item.image}" class="card__image" alt="product">
                  <span class="card__price">€${item.price.toFixed(2)}</span>
                </div>
                <div class="card__title">${item.name}</div>
                <button button type="button" class="card__button">
                  <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                </button>
              </div>`;
    }).join('');
    this._elem.querySelector('.products-grid__inner').insertAdjacentHTML("beforeend", gridInnerContent);
  }

  dataInCard(dataIn) {
    // метод выполняющий присвоение свойств из входных данных в карточки товара
    this.cards = this._elem.querySelectorAll('.card');
    for (let i = 0; i < this.cards.length; i++) {
      Object.assign(this.cards[i], dataIn[i]);
    }
  }

  updateFilter(newFilters) {
    //метод фильтрации и повторной отрисовки карточек с нужными параметрами
    this.filters = Object.assign(this.filters, newFilters);
    //переменные для данных фильтра
    let filCat = this.filters.category;
    let filVeg = this.filters.vegeterianOnly;
    let filMaxSpec = this.filters.maxSpiciness;
    let filNuts = this.filters.noNuts;
    //получаем параметры первоначально отрисованных карточек
    let json = JSON.stringify(this.cards);
    //парсим параметры в обьект
    let value = JSON.parse(json);
    //создаём массив для удобства работы
    let data = [];
    //записываем данные из обьекта value в массив data для возможности использования метода filter();
    Object.assign(data, value);
    //делаем проверку на основании данных по параметрам фильтрации и получаем элементы подходящие под них
    let result = data.filter((item) =>
      (!filCat || item.category == filCat) &&
      (!filVeg || item.vegeterian) &&
      (!filMaxSpec || filMaxSpec >= item.spiciness) &&
      (!filNuts || filNuts && item.nuts !== true)
    );
    //удаляем первоначальную отрисовку контейнера с карточками
    this._elem.querySelector('.products-grid__inner').remove();
    //рисуем новый контейнер с карточками под нужные параметры фильтрации 
    this.render(result);
  }
}
