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
    formElementAdd = modalAdd.querySelector(".popup__container");

  // Общее добавление карточек в галерею из массива

  initialCards.forEach((item) => {
    AddCards(item.name, item.link);
  });

  function AddCards(nameCard, linkCard) {
    const cardsTemlate = document.querySelector("#element").content,
      cardElement = cardsTemlate.querySelector(".element").cloneNode(true);

    cardElement.querySelector(".element__img").src = linkCard;
    cardElement.querySelector(".element__img").alt = nameCard;
    cardElement.querySelector(".element__title").textContent = nameCard;
    cardsPlace.prepend(cardElement);
  }

  // Окно редактирования информации путешественника

  triggerModalEdit.addEventListener("click", () => {
    modalEdit.classList.add("popup_opened");
    nameInput.value = nameValue.textContent;
    jobInput.value = jobValue.textContent;
  });

  function closeModal(modalWindow) {
    modalWindow.classList.remove("popup_opened");
  }

  closeBtnModalEdit.addEventListener("click", () => {
    closeModal(modalEdit);
  });

  function handleFormEditSubmit(evt) {
    evt.preventDefault();
    nameValue.textContent = nameInput.value;
    jobValue.textContent = jobInput.value;
    closeModal(modalEdit);
  }

  formElementEdit.addEventListener("submit", handleFormEditSubmit);

  // Окно добавления карточки + добавление карточки

  triggerModalAdd.addEventListener("click", () => {
    modalAdd.classList.add("popup_opened");
  });

  closeBtnModalAdd.addEventListener("click", () => {
    closeModal(modalAdd);
  });

  function handleFormAddSubmit(evt) {
    evt.preventDefault();
    let titleInput = modalAdd.querySelectorAll(".popup__input")[0],
      linkInput = modalAdd.querySelectorAll(".popup__input")[1];
    AddCards(titleInput.value, linkInput.value);
    titleInput.value = "";
    linkInput.value = "";
    closeModal(modalAdd);
  }

  formElementAdd.addEventListener("submit", handleFormAddSubmit);

  // Лайки

  const elementsIcon = document.querySelectorAll(".element__icon");

  Array.from(elementsIcon).forEach((element) => {
    element.addEventListener("click", () => {
      element.classList.toggle("element__icon_active");
    });
  });

  //Удаление карточки

  const trashBtns = document.querySelectorAll(".element__trash");

  trashBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.closest(".element").remove();
    });
  });

  // Открытие модального окна с картинкой



});
