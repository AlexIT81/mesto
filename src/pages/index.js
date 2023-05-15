import "./index.css";
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirm from "../components/PopupWithConfirm";
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

/** Валидация форм */
const editFormValidator = new FormValidator(validationConfig, formElementEdit),
  addFormValidator = new FormValidator(validationConfig, formElementAdd);
editFormValidator.enableValidation();
addFormValidator.enableValidation();

/** Модалка с большой картинкой */
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

api
  .getUserInfo()
  .then((res) => {
    userInfo.setUserInfo(res);
  })
  .catch((err) => {
    console.log(err);
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
    api
      .editUserInfo({ name, job })
      .then((res) => {
        userInfo.setUserInfo(res);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
    modalEdit.close();
  },
});
modalEdit.setEventListeners();

/** Модалка с подтверждение */
const modalConfirm = new PopupWithConfirm(".popup_confirm");
modalConfirm.setEventListeners();

/** Функция создания карточки методом класса Card*/
function createCard(data) {
  const newCard = new Card(
    {
      data: data,
      myId: userInfo.getUserId(),
      handleCardClick: (link, name) => {
        modalImage.open(link, name);
      },
      handleDeleteBtn: (e) => {
        const cardElement = e.target.closest(".element");
        const thisCardId = newCard.getCardId();
        modalConfirm.open();
        modalConfirm.setSubmitConfirm(() => {
          api
            .deleteCard(thisCardId)
            .then(() => {
              cardElement.remove();
              modalConfirm.close();
            })
            .catch((err) => {
              console.log(err);
            });
        });
      },
      handleLikeBtn: (e) => {
        const thisCardId = newCard.getCardId();
        if (e.target.classList.contains('element__icon_active')) {
          api
          .removeLike(thisCardId)
          .then((res) => {
            console.log(res.likes);
            const likeQuantity = res.likes.length;
            newCard.setLikeQuantity(likeQuantity);
          })
          .catch((err) => {
            console.log(err);
          });
        } else {
          api
          .setLike(thisCardId)
          .then((res) => {
            console.log(res.likes);
            const likeQuantity = res.likes.length;
            newCard.setLikeQuantity(likeQuantity);
          })
          .catch((err) => {
            console.log(err);
          });
        }
      },
    },
    "#element"
  );
  return newCard.createCard();
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
    api
      .addNewCard(data)
      .then((res) => {
        console.log(res);
        const card = createCard(res);
        cardsSection.addItem(card);
      })
      .catch((err) => console.log(err));
    modalAdd.close();
  },
});
modalAdd.setEventListeners();
