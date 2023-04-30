export default class Card {
  constructor({ data, handleCardClick }, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._element = this._getTemplate();
    this._trashBtn = this._element.querySelector(".element__trash");
    this._likeBtn = this._element.querySelector(".element__icon");
    this._cardImg = this._element.querySelector(".element__img");
    this._cardTitle = this._element.querySelector(".element__title");
  }

  /** Находим template */
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }

  /** Тоглим лайки */
  _toggleLike() {
    this._likeBtn.classList.toggle("element__icon_active");
  }

  /** Удаляем карточку из DOM */
  _deleteCard() {
    this._element.remove();
  }

  /** Обработка клика по картинки */
  _handleImageClick(e) {
    this._handleCardClick(e.target.src, e.target.alt);
  }

  /** Навешиваем обработчики */
  _setEventListeners() {
    this._trashBtn.addEventListener("click", () => this._deleteCard());
    this._likeBtn.addEventListener("click", () => this._toggleLike());
    this._cardImg.addEventListener("click", (e) => this._handleImageClick(e));
  }

  /** Функция создания карточки */
  createCard() {
    this._setEventListeners();
    this._cardImg.src = this._link;
    this._cardImg.alt = this._name;
    this._cardTitle.textContent = this._name;
    return this._element;
  }
}
