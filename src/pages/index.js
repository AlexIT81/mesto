import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  validationConfig,
  triggerModalEdit,
  triggerModalAdd,
  formElementEdit,
  formElementAdd,
} from "../utils/constants.js";

const editFormValidator = new FormValidator(validationConfig, formElementEdit),
  addFormValidator = new FormValidator(validationConfig, formElementAdd);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

const modalImage = new PopupWithImage(".popup_image");
modalImage.setEventListeners();

/** Функция создания карточки методом класса Card*/
function createCard(data) {
  return new Card(
    {
      data: data,
      handleCardClick: (link, name) => {
        modalImage.open(link, name);
      },
    },
    "#element"
  ).createCard();
}

/** Начальное добавление карточек в галерею из массива */
const initialAddCards = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const card = createCard(data);
      initialAddCards.addItem(card);
    },
  },
  ".elements"
);
initialAddCards.rendererItems();

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__sub-title",
});

/** Открытие модалки с добавлением карточки */
triggerModalAdd.addEventListener("click", () => {
  modalAdd.open();
  addFormValidator.resetValidation();
});

const modalAdd = new PopupWithForm({
  popupSelector: ".popup_add",
  handleFormSubmit: (inputsValues) => {
    const data = {
      name: inputsValues.title,
      link: inputsValues.link,
    };
    const card = createCard(data);
    initialAddCards.addItem(card);
    modalAdd.close();
  },
});
modalAdd.setEventListeners();

/** Открытие модалки с редактированием */
triggerModalEdit.addEventListener("click", () => {
  modalEdit.open();
  editFormValidator.resetValidation();
  modalEdit.setInputValues(userInfo.getUserInfo());
});

const modalEdit = new PopupWithForm({
  popupSelector: ".popup_edit",
  handleFormSubmit: ({ name, job }) => {
    userInfo.setUserInfo({ name, job });
    modalEdit.close();
  },
});
modalEdit.setEventListeners();
