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
    this._elem.insertAdjacentHTML("beforeend", `<div class="products-grid__inner"></div>`);
    this.render(products);
    // this.dataInCard(products);
  }

  render(dataIn) {
    //метод выполнящий отрисовку карточек товара
    for (let i = 0; i < dataIn.length; i++) {
      let gridInnerContent = new ProductCard(dataIn[i]).elem;
      // Object.assign(gridInnerContent, dataIn[i]);
      this._elem.querySelector('.products-grid__inner').append(gridInnerContent);
    }

  }

  // dataInCard(dataIn) {
  //   // метод выполняющий присвоение свойств из входных данных в карточки товара
  //   this.cards = this._elem.querySelectorAll('.card');
  //   for (let i = 0; i < this.cards.length; i++) {
  //     Object.assign(this.cards[i], dataIn[i]);
  //   }
  // }

  updateFilter(newFilters) {
    //метод фильтрации и повторной отрисовки карточек с нужными параметрами
    this.filters = Object.assign(this.filters, newFilters);
    //переменные для данных фильтра
    let filCat = this.filters.category;
    let filVeg = this.filters.vegeterianOnly;
    let filMaxSpec = this.filters.maxSpiciness;
    let filNuts = this.filters.noNuts;
    // //получаем параметры первоначально отрисованных карточек
    // let json = JSON.stringify(this.cards);
    // //парсим параметры в обьект
    // let value = JSON.parse(json);
    // //создаём массив для удобства работы
    // let data = [];
    // //записываем данные из обьекта value в массив data для возможности использования метода filter();
    // Object.assign(data, value);
    // //делаем проверку на основании данных по параметрам фильтрации и получаем элементы подходящие под них
    // let cards = this._elem.querySelectorAll('.card');
    // let data = Array.from(cards);
    let result = this.products.filter((item) =>
      (!filNuts || item.nuts !== true) &&
      (!filVeg || item.vegeterian == true) &&
      (filMaxSpec == undefined || item.spiciness <= filMaxSpec) &&
      (!filCat || filCat == '' || item.category == filCat)
    );
    this._elem.querySelector('.products-grid__inner').innerHTML = "";
    this.render(result);
    // cards.forEach(item => item.style.display = 'none');
    // result.forEach(item => item.style.display = '');
    // //удаляем первоначальную отрисовку карточек
    // //рисуем новыe карточки под нужные параметры фильтрации 
  }
}
