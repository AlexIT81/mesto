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

  const cardsPlace = document.querySelector(".elements"),
    triggerModalEdit = document.querySelector(".profile__edit-btn"),
    triggerModalAdd = document.querySelector(".profile__add-btn"),
    modalEdit = document.querySelector(".popup_edit"),
    modalAdd = document.querySelector(".popup_add"),
    modalImage = document.querySelector(".popup_image"),
    closeBtnModalEdit = modalEdit.querySelector(".popup__close"),
    closeBtnModalAdd = modalAdd.querySelector(".popup__close"),
    closeBtnModalImage = modalImage.querySelector(".popup__close"),
    nameValue = document.querySelector(".profile__title"),
    jobValue = document.querySelector(".profile__sub-title"),
    nameInput = modalEdit.querySelectorAll(".popup__input")[0],
    jobInput = modalEdit.querySelectorAll(".popup__input")[1],
    formElementEdit = modalEdit.querySelector(".popup__container"),
    formElementAdd = modalAdd.querySelector(".popup__container"),
    cardSection = document.querySelector('.elements');

  // Общие функции

  function openModal(modalWindow) {
    modalWindow.classList.add("popup_opened");
  }

  function closeModal(modalWindow) {
    modalWindow.classList.remove("popup_opened");
  }

  function addCard(cardName, cardLink) {
    const cardsTemlate = document.querySelector("#element").content,
      cardElement = cardsTemlate.querySelector(".element").cloneNode(true);

    cardElement.querySelector(".element__img").src = cardLink;
    cardElement.querySelector(".element__img").alt = cardName;
    cardElement.querySelector(".element__title").textContent = cardName;
    cardsPlace.prepend(cardElement);
  }

  // Начальное добавление карточек в галерею из массива

  initialCards.forEach((item) => addCard(item.name, item.link));

  // Окно редактирования информации путешественника

  triggerModalEdit.addEventListener("click", () => {
    openModal(modalEdit);
    nameInput.value = nameValue.textContent;
    jobInput.value = jobValue.textContent;
  });

  function handleFormEditSubmit(evt) {
    evt.preventDefault();
    nameValue.textContent = nameInput.value;
    jobValue.textContent = jobInput.value;
    closeModal(modalEdit);
  }

  formElementEdit.addEventListener("submit", handleFormEditSubmit);
  closeBtnModalEdit.addEventListener("click", () => closeModal(modalEdit));

  // Окно добавления карточки + добавление карточки

  triggerModalAdd.addEventListener("click", () => openModal(modalAdd));
  closeBtnModalAdd.addEventListener("click", () => closeModal(modalAdd));

  function handleFormAddSubmit(evt) {
    evt.preventDefault();
    const titleInput = modalAdd.querySelectorAll(".popup__input")[0],
      linkInput = modalAdd.querySelectorAll(".popup__input")[1];
    addCard(titleInput.value, linkInput.value);
    titleInput.value = "";
    linkInput.value = "";
    closeModal(modalAdd);
  }

  formElementAdd.addEventListener("submit", handleFormAddSubmit);
  closeBtnModalImage.addEventListener('click', () => closeModal(modalImage));

  // Делегирование событий

  cardSection.addEventListener('click', (e) => {

    //Удаление карточки

    if (e.target.classList.contains('element__trash')) {
      e.target.closest(".element").remove();
    }

    // Открытие модального окна с картинкой

    if (e.target.classList.contains('element__img')) {
      const imgUrl = e.target.src,
      imgDescription = e.target.alt;

      modalImage.querySelector(".popup__big-image").src = imgUrl;
      modalImage.querySelector(".popup__big-image").alt = imgDescription;
      modalImage.querySelector(".popup__figcaption").textContent = imgDescription;
      openModal(modalImage);
    }

    // Лайки

    if (e.target.classList.contains('element__icon')) {
      e.target.classList.toggle("element__icon_active");
    }
  });
});
