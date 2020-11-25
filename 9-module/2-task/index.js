import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
    this.caorusel = new Carousel(slides);
    this.ribbonMenu = new RibbonMenu(categories);
    this.stepSlider = new StepSlider({
      steps: 5,
      value: 3
    });
    this.cartIcon = new CartIcon();
    this.cart = new Cart(this.cartIcon);
    this.addEventListeners();
  }

  async render() {
    let sliderBody = document.querySelector('[data-carousel-holder]');
    sliderBody.append(this.caorusel.elem);

    let ribbonMenuBody = document.querySelector('[data-ribbon-holder]');
    ribbonMenuBody.append(this.ribbonMenu.elem);

    let stepSliderBody = document.querySelector('[data-slider-holder]');
    stepSliderBody.append(this.stepSlider.elem);

    let cartIconBody = document.querySelector('[data-cart-icon-holder]');
    cartIconBody.append(this.cartIcon.elem);

    const adres = `products.json`;
    let response = await fetch(adres);
    this.productsArray = await response.json();

    this.productsGrid = new ProductsGrid(this.productsArray);
    let productBody = document.querySelector('[data-products-grid-holder]');
    productBody.append(this.productsGrid.elem);

    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });
  }

  addEventListeners() {
    document.body.addEventListener('product-add', (event) => {
      let selectedProductId = event.detail;
      let findResult = this.productsArray.find((item) =>
        (item.id == selectedProductId)
      );
      if (!findResult) {
        return;
      }
      this.cart.addProduct(findResult);
    });


    document.addEventListener('slider-change', (event) => {
      this.productsGrid.updateFilter({
        maxSpiciness: event.detail
      });
    });

    document.querySelector('[data-ribbon-holder]').addEventListener('ribbon-select', (event) => {
      this.productsGrid.updateFilter({
        category: event.detail
      });
    });

    document.addEventListener('change', (event) => {
      let checked = event.target.checked;
      if (event.target.id == "vegeterian-checkbox") {
        this.productsGrid.updateFilter({
          vegeterianOnly: checked
        });
      }
      if (event.target.id == "nuts-checkbox") {
        this.productsGrid.updateFilter({
          noNuts: checked
        });
      }
    });
  }
}
