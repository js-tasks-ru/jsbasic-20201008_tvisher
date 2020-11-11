import createElement from '../../assets/lib/create-element.js';

export default class Modal {

  constructor() {
    this._elem = document.createElement('div');
    this._elem.classList.add('modal');
    this.render(this._elem);
    this.addEventListeners();
  }

  open() {
    document.body.append(this._elem);
    document.body.classList.add('is-modal-open');
  }

  render(modal) {
    modal.insertAdjacentHTML("afterbegin", `<div class="modal__overlay"></div>
    <div class="modal__inner">
      <div class="modal__header">
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>
        <h3 class="modal__title">
        </h3>
      </div>
      <div class="modal__body"></div>
    </div>`);
  }

  setTitle(newTitle) {
    let modalTitle = this._elem.querySelector('.modal__title');
    modalTitle.innerHTML = newTitle;
  }

  setBody(node) {
    let modalBody = this._elem.querySelector('.modal__body');
    modalBody.innerHTML = "";
    modalBody.append(node);
  }

  close() {
    this._elem.remove();
    document.body.classList.remove('is-modal-open');
    document.removeEventListener('keydown', this.escClick);
  }

  onClick = (event) => {
    if (event.target.closest('.modal__close')) {
      this.close();
    }
  }

  escClick = (event) => {
    if (event.code == 'Escape') {
      this.close();
    }
  }

  addEventListeners = () => {
    this._elem.addEventListener("click", this.onClick);
    document.addEventListener('keydown', this.escClick);
  }
}
