export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export const triggerModalProfile = document.querySelector(".profile__edit-btn"),
  triggerModalCard = document.querySelector(".profile__add-btn"),
  triggerModalAvatar= document.querySelector(".profile__avatar-btn"),
  formElementProfile = document.forms["edit"],
  formElementAdd = document.forms["add"],
  formElementAvatar = document.forms["update-avatar"];

export const apiToken = "15ec086a-bb68-435e-a3c5-e0fe5f2acf9d";
export const apiUrl = "https://mesto.nomoreparties.co/v1/";
export const apiCohortId = "cohort-66";
