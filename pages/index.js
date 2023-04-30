import { initialCards, validationConfig } from '../utils/constants.js';
import Card  from '../components/Card.js';
import FormValidator  from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';


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

  const userInfo = new UserInfo({
    nameSelector: ".profile__title",
    jobSelector: ".profile__sub-title"
  });

  const modalEditTemp = new PopupWithForm({
    popupSelector: '.popup_edit',
    handleFormSubmit: ({ name, job }) => {
      userInfo.setUserInfo({ name, job });
      modalEditTemp.close();
    }
  });

  const modalAddTemp = new PopupWithForm({
    popupSelector: '.popup_add',
    handleFormSubmit: (inputsValues) => {
      const data = {
        name: inputsValues.title,
        link: inputsValues.link
      }
      const newCard = createCard({
        data,
        handleCardClick: (e) => {
          modalImageTemp.open(e.target.src, e.target.alt);
        }
      }, '#element');
      initialAddCards.addItem(newCard);
      modalAddTemp.close();
    }
  });

  const modalImageTemp= new PopupWithImage('.popup_image');



/** Модальное окно с редактированием  */
triggerModalEdit.addEventListener('click', () => {
  modalEditTemp.open();
  modalEditTemp.initialData(userInfo.getUserInfo());
  editFormValidator.clearInputsError();
});

/** Модальное окно с добавлением  */
triggerModalAdd.addEventListener('click', () => {
  modalAddTemp.open();
  addFormValidator.clearInputsError();
});




/** Запуск валидации всех форм на странице */
formElements.forEach((formElement) => {
  new FormValidator(validationConfig, formElement).enableValidation();
  })

/** Функция создания карточки методом класса Card*/
function createCard(cardData, template) {
  return new Card(cardData, template).createCard();
}

/** Начальное добавление карточек в галерею из массива */
const initialAddCards = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard({
      data: item,
      handleCardClick: (e) => {
        modalImageTemp.open(e.target.src, e.target.alt);
      }
    }, '#element');
    initialAddCards.addItem(card);
  }
}, ".elements");
initialAddCards.rendererItems();
