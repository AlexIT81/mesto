export default class Card {
  constructor(
    { data, currentUserId, handleCardClick, handleDeleteBtn, handleLikeBtn },
    templateSelector
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likesQuantity = data.likes.length;
    this._arrLikes = data.likes;
    this._cardId = data._id;
    this._cardOwnerId = data.owner._id;
    this._currentUserId = currentUserId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteBtn = handleDeleteBtn;
    this._handleLikeBtn = handleLikeBtn;
    this._element = this._getTemplate();
    this._buttonTrash = this._element.querySelector(".element__trash");
    this._buttonLike = this._element.querySelector(".element__icon");
    this._elementOutputLikes = this._element.querySelector(".element__icon-count");
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

  isLiked() {
    return this._arrLikes.some((elem) => elem._id == this._currentUserId);
  }

  /** Тоглим иконку лайка */
  _toggleLike() {
    this._buttonLike.classList.toggle("element__icon_active");
  }

  /** Установим количество лайков */
  updateLikes(data) {
    this._elementOutputLikes.textContent = data.likes.length;;
    this._toggleLike();
    this._arrLikes = data.likes;
  }

  /** Удаляем карточку из DOM */
  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  /** Обработка клика по картинки */
  _handleImageClick() {
    this._handleCardClick(this._link, this._name);
  }

  /** Навешиваем обработчики */
  _setEventListeners() {
    if (this._currentUserId === this._cardOwnerId) {
      this._buttonTrash.addEventListener("click", () => this._handleDeleteBtn());
    } else {
      this._buttonTrash.remove();
    }
    this._buttonLike.addEventListener("click", () => {
      this._handleLikeBtn();
    });
    this._cardImg.addEventListener("click", () =>
      this._handleImageClick()
    );
  }

  /** Функция создания карточки */
  createCard() {
    this._setEventListeners();
    this._cardImg.src = this._link;
    this._cardImg.alt = this._name;
    this._cardTitle.textContent = this._name;
    this._elementOutputLikes.textContent = this._likesQuantity;
    if (this.isLiked()) this._buttonLike.classList.add("element__icon_active");
    return this._element;
  }

  getCardId() {
    return this._cardId;
  }
}
