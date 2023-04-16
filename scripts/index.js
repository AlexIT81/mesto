import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const cardWrapper = document.querySelector(".elements"),
  triggerModalEdit = document.querySelector(".profile__edit-btn"),
  triggerModalAdd = document.querySelector(".profile__add-btn"),
  modalEdit = document.querySelector(".popup_edit"),
  modalAdd = document.querySelector(".popup_add"),
  nameValue = document.querySelector(".profile__title"),
  jobValue = document.querySelector(".profile__sub-title"),
  nameInput = modalEdit.querySelector(".popup__input_name"),
  jobInput = modalEdit.querySelector(".popup__input_job"),
  formElements = [...document.forms],
  formElementEdit = document.forms["edit"],
  formElementAdd = document.forms["add"],
  modalImage = document.querySelector(".popup_image"),
  modalImageFigure = modalImage.querySelector(".popup__big-image"),
  modalImageFigcaption = modalImage.querySelector(".popup__figcaption"),
  titleInput = modalAdd.querySelector(".popup__input_title"),
  linkInput = modalAdd.querySelector(".popup__input_link"),
  modalWindows = document.querySelectorAll(".popup"),
  editFormValidator = new FormValidator(validationConfig, formElementEdit),
  addFormValidator = new FormValidator(validationConfig, formElementAdd);

/** Функция открытия модального окна */
function openModal(modal) {
  modal.classList.add("popup_opened");
  document.addEventListener("keydown", closeModalByPressEsc);
}

/** Функция-обработчик закрытия модалки при нажатии Esc */
function closeModalByPressEsc(e) {
  if (e.key === "Escape") {
    const openedModal = document.querySelector(".popup_opened");
    closeModal(openedModal);
  }
}

/** Функция закрытия модального окна */
function closeModal(modal) {
  document.removeEventListener("keydown", closeModalByPressEsc);
  modal.classList.remove("popup_opened");
}

/** Закрытие модального окна кликом на оверлей и на крестик */
modalWindows.forEach((modal) => {
  modal.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("popup_opened") || e.target.classList.contains("popup__close")) closeModal(modal)
  });
});

/** Функция генерации модального окна с картинкой из карточки */
function createModalImage(imgUrl, imgDescription) {
  modalImageFigure.src = imgUrl;
  modalImageFigure.alt = imgDescription;
  modalImageFigcaption.textContent = imgDescription;
}

/** Функция обработки данных путешественника */
function handleFormEditSubmit(e) {
  e.preventDefault();
  nameValue.textContent = nameInput.value;
  jobValue.textContent = jobInput.value;
  closeModal(modalEdit);
}

/** Функция создания карточки методом класса Card*/
function createCard(cardData, template) {
  return new Card(cardData, template).createCard();
}

/** Функция добавления карточки из модального окна */
function handleFormAddSubmit(e) {
  e.preventDefault();
  const cardData = {
    name: titleInput.value,
    link: linkInput.value
  }
  addCard(createCard(cardData, '#element'));
  e.target.reset();
  closeModal(modalAdd);
}

/** Функция добавления карточки в DOM */
function addCard(card) {
  cardWrapper.prepend(card);
}

/** Начальное добавление карточек в галерею из массива */
initialCards.forEach((item) => {
  addCard(createCard(item, '#element'));
});

/** Редактирование информации о путешественнике */
triggerModalEdit.addEventListener("click", () => {
  openModal(modalEdit);
  editFormValidator.clearInputsError();
  nameInput.value = nameValue.textContent;
  jobInput.value = jobValue.textContent;
});

formElementEdit.addEventListener("submit", handleFormEditSubmit);

/** Добавление карточки */
triggerModalAdd.addEventListener("click", () => {
  openModal(modalAdd);
  addFormValidator.clearInputsError();
});
formElementAdd.addEventListener("submit", handleFormAddSubmit);

/** Запуск валидации всех форм на странице */
formElements.forEach((formElement) => {
  new FormValidator(validationConfig, formElement).enableValidation();
  })

export { createModalImage, openModal, modalImage };
