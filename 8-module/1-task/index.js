import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {
        once: true
      });

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  //метод обнуления параметров пизиционирования корзины
  zeroPosition() {
    Object.assign(this.elem.style, {
      position: '',
      top: '',
      left: '',
      zIndex: ''
    });
  }

  updatePosition() {
    //проверяем наличие товара в корзине
    if (!this.elem.offsetWidth) {
      return false;
    }
    //получаем текущее положение корзины относительно документа
    let initialTopCoord = this.elem.getBoundingClientRect().top + window.pageYOffset;
    let leftIndent = Math.min(
      document.querySelector('.container').getBoundingClientRect().right + 20,
      document.documentElement.clientWidth - this.elem.offsetWidth - 10
    ) + 'px';
    //меняем позиционирование корзины при прокретке страницы
    if (window.pageYOffset > initialTopCoord) {
      Object.assign(this.elem.style, {
        position: 'fixed',
        top: '50px',
        zIndex: 1e3,
        right: '10px',
        left: leftIndent
      });
    }
    //обнуляем позинионирование корзыни при скролле к началу страницы
    if (window.pageYOffset <= 50) {
      this.zeroPosition();
    }
    //обнуляем позинионирование корзины при ширине экрана менее 767px
    if (document.documentElement.clientWidth <= 767) {
      this.zeroPosition();
    }
  }
}
