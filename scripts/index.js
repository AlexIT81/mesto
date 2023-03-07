window.addEventListener('DOMContentLoaded', () => {
  const initialCards = [
    {name: 'Архыз', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'},
    {name: 'Челябинская область', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'},
    {name: 'Иваново', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'},
    {name: 'Камчатка', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'},
    {name: 'Холмогорский район', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'},
    {name: 'Байкал', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'}
  ];

  const cardsPlace = document.querySelector(".elements"),
    triggerModalEdit = document.querySelector(".profile__edit-btn"),
    triggerModalAdd = document.querySelector(".profile__add-btn"),
    modalEdit = document.querySelector(".popup_edit"),
    modalAdd = document.querySelector(".popup_add"),
    closeBtnModalEdit = modalEdit.querySelector(".popup__close"),
    closeBtnModalAdd = modalAdd.querySelector(".popup__close"),
    nameValue = document.querySelector(".profile__title"),
    jobValue = document.querySelector(".profile__sub-title"),
    nameInput = modalEdit.querySelectorAll(".popup__input")[0],
    jobInput = modalEdit.querySelectorAll(".popup__input")[1],
    formElementEdit = modalEdit.querySelector(".popup__container");

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

  function handleFormSubmit(evt) {
    evt.preventDefault();
    nameValue.textContent = nameInput.value;
    jobValue.textContent = jobInput.value;
    closeModal(modalEdit);
  }

  formElementEdit.addEventListener("submit", handleFormSubmit);


  // Окно добавления карточки

  triggerModalAdd.addEventListener('click', () => {
    modalAdd.classList.add("popup_opened");
  });

  closeBtnModalAdd.addEventListener("click", () => {
    closeModal(modalAdd);
  });

  // Добавление карточек в галерею

  initialCards.forEach((item) => {
    AddCards(item.name, item.link);
  });

  function AddCards(nameCard, linkCard) {
    const cardsTemlate = document.querySelector('#element').content;
    const cardElement = cardsTemlate.querySelector('.element').cloneNode(true);

    cardElement.querySelector('.element__img').src = linkCard;
    cardElement.querySelector('.element__img').alt = nameCard;
    cardElement.querySelector('.element__title').textContent = nameCard;
    cardsPlace.appendChild(cardElement);
  }
});
