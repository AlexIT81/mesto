export default class Card {
  constructor({ data, handleCardClick }, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  /** Находим template */
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }

  /** Навешиваем обработчики */
  _setEventListeners() {
    this._element = this._getTemplate();
    const cardElementTrash = this._element.querySelector(".element__trash"),
      cardElementIcon = this._element.querySelector(".element__icon"),
      cardElementImg = this._element.querySelector(".element__img");
    cardElementTrash.addEventListener("click", () => this._element.remove());
    cardElementIcon.addEventListener("click", () => cardElementIcon.classList.toggle("element__icon_active"));
    cardElementImg.addEventListener("click", (e) => this._handleCardClick(e.target.src, e.target.alt));
  }

  /** Функция создания карточки */
  createCard() {
    this._setEventListeners();
    const cardElementTitle = this._element.querySelector(".element__title"),
      cardElementImg = this._element.querySelector(".element__img");
    cardElementImg.src = this._link;
    cardElementImg.alt = this._name;
    cardElementTitle.textContent = this._name;
    return this._element;
  }
}
