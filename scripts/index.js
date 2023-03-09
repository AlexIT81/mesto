window.addEventListener("DOMContentLoaded", () => {
  const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
  ];

  const cardsWrapper = document.querySelector(".elements"),
    triggerModalEdit = document.querySelector(".profile__edit-btn"),
    triggerModalAdd = document.querySelector(".profile__add-btn"),
    modalEdit = document.querySelector(".popup_edit"),
    modalAdd = document.querySelector(".popup_add"),
    modalImage = document.querySelector(".popup_image"),
    closeModalBtns = document.querySelectorAll(".popup__close"),
    nameValue = document.querySelector(".profile__title"),
    jobValue = document.querySelector(".profile__sub-title"),
    nameInput = modalEdit.querySelectorAll(".popup__input")[0],
    jobInput = modalEdit.querySelectorAll(".popup__input")[1],
    formElementEdit = modalEdit.querySelector(".popup__container"),
    formElementAdd = modalAdd.querySelector(".popup__container");

  /** Функция открытия и закрытия модального окна */
  function toggleModal(modalWindow) {
    modalWindow.classList.toggle("popup_opened");
  }

  /** Функция добавления карточки на страницу */
  function addCard(cardName, cardLink) {
    const cardsTemlate = document.querySelector("#element").content,
      cardElement = cardsTemlate.querySelector(".element").cloneNode(true);

    cardElement.querySelector(".element__img").src = cardLink;
    cardElement.querySelector(".element__img").alt = cardName;
    cardElement.querySelector(".element__title").textContent = cardName;
    cardsWrapper.prepend(cardElement);
  }

  /** Функция генерации модального окна с картинкой из карточки */
  function createModalImage(e) {
    const imgUrl = e.target.src,
        imgDescription = e.target.alt;

    modalImage.querySelector(".popup__big-image").src = imgUrl;
    modalImage.querySelector(".popup__big-image").alt = imgDescription;
    modalImage.querySelector(".popup__figcaption").textContent = imgDescription;
  }

  /** Функция обработки данных путешественника */
  function handleFormEditSubmit(e) {
    e.preventDefault();
    nameValue.textContent = nameInput.value;
    jobValue.textContent = jobInput.value;
    toggleModal(modalEdit);
  }

  /** Функция добавления карточки */
  function handleFormAddSubmit(e) {
    e.preventDefault();
    const titleInput = modalAdd.querySelectorAll(".popup__input")[0],
      linkInput = modalAdd.querySelectorAll(".popup__input")[1];
    addCard(titleInput.value, linkInput.value);
    titleInput.value = "";
    linkInput.value = "";
    toggleModal(modalAdd);
  }

  /** Начальное добавление карточек в галерею из массива */
  initialCards.forEach(item => addCard(item.name, item.link));

  /** Закрытие модалок кнопкой */
  closeModalBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.target.closest(".popup").classList.remove("popup_opened");
    });
  });

  /** Редактирование информации о путешественнике */
  triggerModalEdit.addEventListener("click", () => {
    toggleModal(modalEdit);
    nameInput.value = nameValue.textContent;
    jobInput.value = jobValue.textContent;
  });

  formElementEdit.addEventListener("submit", handleFormEditSubmit);

  /** Добавление карточки */
  triggerModalAdd.addEventListener("click", () => toggleModal(modalAdd));
  formElementAdd.addEventListener("submit", handleFormAddSubmit);

  /** Делегирование событий, обработчики для карточек */
  cardsWrapper.addEventListener("click", (e) => {
    /** Удаление карточки */
    if (e.target.classList.contains("element__trash")) {
      e.target.closest(".element").remove();
    }

    /** Модальное окно с картинкой */
    if (e.target.classList.contains("element__img")) {
      createModalImage(e);
      toggleModal(modalImage);
    }

    /** Лайки */
    if (e.target.classList.contains("element__icon")) {
      e.target.classList.toggle("element__icon_active");
    }
  });
});
