import "./index.css";
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  // initialCards,
  validationConfig,
  triggerModalEdit,
  triggerModalAdd,
  formElementEdit,
  formElementAdd,
  apiToken,
  apiUrl,
  apiCogortId,
} from "../utils/constants.js";

const editFormValidator = new FormValidator(validationConfig, formElementEdit),
  addFormValidator = new FormValidator(validationConfig, formElementAdd);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

const modalImage = new PopupWithImage(".popup_image");
modalImage.setEventListeners();

/** Подключаем API */
const api = new Api(apiToken, apiUrl, apiCogortId);

/** Создаем пользователя из класса */
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__sub-title",
  avatarSelector: ".profile__avatar",
});

/** Загрузка информации о пользователе с сервера  */
api
  .getUserInfo()
  .then((res) => {
    userInfo.setUserInfo({ name: res.name, job: res.about });
    userInfo.setUserAvatar(res.avatar);
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

/** Открытие модалки с редактированием */
triggerModalEdit.addEventListener("click", () => {
  modalEdit.open();
  editFormValidator.resetValidation();
  modalEdit.setInputValues(userInfo.getUserInfo());
});

const modalEdit = new PopupWithForm({
  popupSelector: ".popup_edit",
  handleFormSubmit: ({ name, job }) => {
    api.editUserInfo({ name, job }).then((res) => {
      userInfo.setUserInfo({ name: res.name, job: res.about });
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
    modalEdit.close();
  },
});
modalEdit.setEventListeners();

/** Функция создания карточки методом класса Card*/
function createCard(data) {
  return new Card(
    {
      data: data,
      handleCardClick: (link, name) => {
        console.log(name);
        modalImage.open(link, name);
      },
    },
    "#element"
  ).createCard();
}

/** Инициализация класса для отрисовки карточек */
const cardsSection = new Section(
  {
    renderer: (data) => {
      const card = createCard(data);
      cardsSection.addItem(card);
    },
  },
  ".elements"
);

/** Отрисовка начальных карточек на странице */
api
  .getInitialCards()
  .then((res) => {
    cardsSection.rendererItems(res);
  })
  .catch((err) => {
    console.log(err);
  });

/** Начальное добавление карточек в галерею из массива */
// const initialAddCards = new Section(
//   {
//     items: initialCards,
//     renderer: (data) => {
//       const card = createCard(data);
//       initialAddCards.addItem(card);
//     },
//   },
//   ".elements"
// );
// initialAddCards.rendererItems();

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
    api.addNewCard(data)
      .then((res) => {
        const card = createCard(data);
        cardsSection.addItem(card);
      })
      .catch(err => console.log(err));
    modalAdd.close();
  },
});
modalAdd.setEventListeners();

/** Открытие модалки с редактированием */
// triggerModalEdit.addEventListener("click", () => {
//   modalEdit.open();
//   editFormValidator.resetValidation();
//   modalEdit.setInputValues(userInfo.getUserInfo());
// });

// const modalEdit = new PopupWithForm({
//   popupSelector: ".popup_edit",
//   handleFormSubmit: ({ name, job }) => {
//     userInfo.setUserInfo({ name, job });
//     modalEdit.close();
//   },
// });
// modalEdit.setEventListeners();
