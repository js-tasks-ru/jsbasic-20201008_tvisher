import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.modal = new Modal();
    this.addEventListeners();
  }
  //метод добавления товара в корзину
  addProduct(product) {
    let productItem = {
      product,
      count: 1
    };

    let findResult = this.cartItems.find((item) =>
      (item.product.id == product.id)
    );

    if (findResult) {
      findResult.count += 1;
    } else {
      this.cartItems.push(productItem);
    }

    if (!this.cartItems.length) {
      this.cartItems.push(productItem);
    }

    this.onProductUpdate(this.cartItem);
  }
  //метод обновления колличества товаров в корзине
  updateProductCount(productId, amount) {
    let selectedProduct = this.cartItems.find((item) =>
      (item.product.id == productId)
    );

    if (amount > selectedProduct.count) {
      selectedProduct.count += 1;
    }
    if (amount < selectedProduct.count) {
      selectedProduct.count -= 1;
    }
    this.cartItems = this.cartItems.filter(item => (item.count >= 1));

    this.onProductUpdate(this.cartItem);
  }

  isEmpty() {
    return !this.cartItems.length;
  }

  getTotalCount() {
    let totalCount = this.cartItems.reduce((value, item) => {
      return item.count + value;
    }, 0);
    return totalCount;
  }

  getTotalPrice() {
    let totalPrice = this.cartItems.reduce((value, item) => {
      return (item.count * item.product.price) + value;
    }, 0);
    return totalPrice;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModalBody() {
    let modalBodyDiv = document.createElement('div');
    this._elem = modalBodyDiv;
    //создаём div в который будем рисовать тело модалки
    //добавляем в мадальное окно форму
    modalBodyDiv.prepend(this.renderOrderForm());
    /*проходим циклом по корзине и вставляем в модалку все товары из корзины +
     добавляем все параметры товаров + прописываем актуальную итоговую стоимось каждого товара учитывая колличество */
    for (let i = 0; i < this.cartItems.length; i++) {
      //рисуем карточки
      modalBodyDiv.prepend(this.renderProduct(this.cartItems[i].product, this.cartItems[i].count));
      //добавляем параметры
      Object.assign(modalBodyDiv.querySelector('.cart-product'), this.cartItems[i]);
      //прописываем актуальную итоговую стоимось каждого товара учитывая колличество
      modalBodyDiv.querySelector('.cart-product__price').innerHTML = `€${(this.cartItems[i].product.price * this.cartItems[i].count).toFixed(2)}`;
    }
    this.modal.setBody(modalBodyDiv);
  }

  renderModal() {
    //создаём и отрисовываем модалку
    this.renderModalBody();
    this.modal.setTitle("Your order");
    this.modal.open();
    //вешаем прослушку события клика для калькуляции стоимости и количества товаров
    this._elem.addEventListener('click', this.calcProducts);
    //вешаем прослушку события submit на форму 
    this._elem.querySelector('.cart-form').addEventListener('submit', this.onSubmit);
  }

  calcProducts = (event) => {
    //проверяем открыта ли модалка и то куда cсовершается нажатие
    if (!this._elem || !event.target.closest('.cart-product')) {
      return false;
    }
    //карточка на которой было событие
    let selectedCard = event.target.closest('.cart-product');
    //получаем id карточки на которую нажали
    let cardId = selectedCard.dataset.productId;
    //кнопка +
    let plusBtn = event.target.closest('.cart-counter__button_plus');
    //кнопка -
    let minusBtn = event.target.closest('.cart-counter__button_minus');

    //меняем колличество товара по нажатию кнопок
    if (plusBtn) {
      selectedCard.count++;
    }
    if (minusBtn) {
      selectedCard.count--;
    }
    //удаляем товар если колличество становится 0
    if (selectedCard.count < 1) {
      selectedCard.remove();
    }
    //присваиваем товару на котором было событие, новое колличество в корзине
    this.updateProductCount(cardId, selectedCard.count);
    //если товаров в корзине нет, закрываем модалку
    if (this.isEmpty()) {
      this.modal.close();
    }
  }

  onProductUpdate(cardProduct) {
    //проверяем что модалка открыта
    if (document.body.classList.contains('is-modal-open')) {
      //находим все товары в корзине модалки
      let cardProducts = this._elem.querySelectorAll('.cart-product');
      //проходим по товарам цклом и рисуем новые параметры
      for (let i = 0; i < cardProducts.length; i++) {
        cardProduct = cardProducts[i];
        //ищем стоимость товаров на этой карточке
        let cardPrice = cardProduct.querySelector('.cart-product__price');
        //ищем количество товаров на этой карточке
        let cardCount = cardProduct.querySelector('.cart-counter__count');
        //ищем общую стоимость товаров в модально окне
        let totalPeice = this._elem.querySelector('.cart-buttons__info-price');
        //обновляем вёрстку в модалке БЕЗ ПОВТОРНОЙ ОТРИСОВКИ ВСЕЙ МОДАЛКИ =)
        cardPrice.innerHTML = `€${(cardProduct.product.price * cardProduct.count).toFixed(2)}`;
        cardCount.innerHTML = `${cardProduct.count}`;
        totalPeice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`
      }
    }

    this.cartIcon.update(this);
  }

  onSubmit = (event) => {
    //отключаем событие по умолчанию
    event.preventDefault();
    //находим форму
    let modalForm = this._elem.querySelector('.cart-form');
    //присваеиваем кнопке нужный класс
    modalForm.querySelector('.cart-buttons__button').classList.add('is-loading');
    //создаём обьект формы для сервера
    let userFormData = new FormData(modalForm);
    //адрес отправки формы
    const adres = 'https://httpbin.org/post';
    //отправляем форму на сервер
    let promise = fetch(adres, {
      method: 'POST',
      body: userFormData
    });
    //получаем промис от сервера и перерисовываем тело и заголовок модалки + обнуляем корзину
    promise.then(() => {
      this._elem.innerHTML = `<div class="modal__body-inner">
      <p>
        Order successful! Your order is being cooked :) <br>
        We’ll notify you about delivery time shortly.<br>
        <img src="/assets/images/delivery.gif">
      </p>
    </div>`;
      //меняем заголовок модалки
      this.modal.setTitle('Success!');
      //обнуляем корзину 
      this.cartItems = [];
      //обнуляем внешний вид корзины 
      if (this.cartItems.length == 0) {
        this.onProductUpdate();
      }
    });

  }
  //прослушка элементов страницы
  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
    document.addEventListener("click", this.modal.onClick);
  }
}
