import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  get elem() {
    return this._elem;
  }
  constructor(categories) {
    this.categories = categories;
    this._elem = document.createElement("div");
    this._elem.classList.add("ribbon");
    this.render(categories);
    this.ribbonInner = this._elem.querySelector('.ribbon__inner');
    this._elem.addEventListener('click', (event) => this.scroller(event));
    this._elem.addEventListener('click', (event) => this.getCategory(event));
  }

  render(dataIn) {
    let leftArrow = `<button class="ribbon__arrow ribbon__arrow_left "><img src="/assets/images/icons/angle-icon.svg" alt="icon"></button>`;
    let rightArrow = `<button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible"><img src="/assets/images/icons/angle-icon.svg" alt="icon"></button>`;

    let links = dataIn.map((value) => {
      return `<a href="#" class="ribbon__item" data-id="${value.id}">${value.name}</a>`;
    }).join('');

    let nav = document.createElement('nav');
    nav.classList.add('ribbon__inner');
    this._elem.append(nav);
    nav.insertAdjacentHTML("afterbegin", links);
    nav.insertAdjacentHTML("beforebegin", leftArrow);
    nav.insertAdjacentHTML("afterend", rightArrow);
  }

  scroller(event) {
    let ribbonInner = this.ribbonInner;
    if (event.target.closest('.ribbon__arrow_right')) {
      ribbonInner.scrollBy(350, 0);
    }

    if (event.target.closest('.ribbon__arrow_left')) {
      ribbonInner.scrollBy(-350, 0);
    }
    //слушаем скролл на блоке со ссылками,скрываем и показыввем стрелки.
    ribbonInner.addEventListener('scroll', () => {
      let leftArrow = this._elem.querySelector('.ribbon__arrow_left');
      let rightArrow = this._elem.querySelector('.ribbon__arrow_right');

      let scrollWidth = ribbonInner.scrollWidth;
      let scrollLeft = ribbonInner.scrollLeft;
      let clientWidth = ribbonInner.clientWidth;
      let scrollRight = scrollWidth - scrollLeft - clientWidth;

      if (scrollLeft > 1) {
        leftArrow.classList.add('ribbon__arrow_visible');
      } else {
        leftArrow.classList.remove('ribbon__arrow_visible');
      }

      if (scrollRight < 1) {
        rightArrow.classList.remove('ribbon__arrow_visible');
      } else {
        rightArrow.classList.add('ribbon__arrow_visible');
      }

    });
  }

  getCategory(event) {
    let categoryLink = event.target.closest('.ribbon__item');
    let activeLink = this._elem.querySelector('.ribbon__item_active');
    if (activeLink) {
      activeLink.classList.remove('ribbon__item_active');
    }
    if (categoryLink) {
      event.preventDefault();
      categoryLink.classList.add('ribbon__item_active');
      this._elem.dispatchEvent(
        new CustomEvent('ribbon-select', {
          detail: `${categoryLink.dataset.id}`,
          bubbles: true
        }));
    }
  }

}
