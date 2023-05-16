import "./index.css";
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import {
  validationConfig,
  triggerModalEdit,
  triggerModalAdd,
  triggerModalAvatar,
  formElementEdit,
  formElementAdd,
  formElementAvatar,
  apiToken,
  apiUrl,
  apiCogortId,
} from "../utils/constants.js";

/** Валидация форм */
const editFormValidator = new FormValidator(validationConfig, formElementEdit),
  addFormValidator = new FormValidator(validationConfig, formElementAdd),
  avatarFormValidator = new FormValidator(validationConfig, formElementAvatar);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarFormValidator.enableValidation();

/** Подключаем API */
const api = new Api(apiToken, apiUrl, apiCogortId);

/** Начальное полученение карточек и данных пользователя с отрисовкой в DOM */
api
  .getServerData()
  .then((res) => {
    const [initialCards, userData] = res;
    userInfo.setUserInfo(userData);
    cardsSection.rendererItems(initialCards);
  })
  .catch((err) => {
    console.error(err);
  });

/** Инициализируем UserInfo */
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__sub-title",
  avatarSelector: ".profile__avatar",
});

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
              console.error(err);
            });
        });
      },
      handleLikeBtn: (e) => {
        const thisCardId = newCard.getCardId();
        if (e.target.classList.contains("element__icon_active")) {
          api
            .removeLike(thisCardId)
            .then((res) => {
              const likeQuantity = res.likes.length;
              newCard.setLikeQuantity(likeQuantity);
            })
            .catch((err) => {
              console.error(err);
            });
        } else {
          api
            .setLike(thisCardId)
            .then((res) => {
              const likeQuantity = res.likes.length;
              newCard.setLikeQuantity(likeQuantity);
            })
            .catch((err) => {
              console.error(err);
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

/** Модалка с редактированием */
triggerModalEdit.addEventListener("click", () => {
  modalEdit.open();
  editFormValidator.resetValidation();
  modalEdit.setInputValues(userInfo.getUserInfo());
});

const modalEdit = new PopupWithForm({
  popupSelector: ".popup_edit",
  handleFormSubmit: ({ name, job }) => {
    modalEdit.renderLoading(true);
    api
      .editUserInfo({ name, job })
      .then((res) => {
        userInfo.setUserInfo(res);
      })
      .catch((err) => {
        console.error(err); // выведем ошибку в консоль
      })
      .finally(() => {
        modalEdit.renderLoading(false);
        modalEdit.close();
      });
  },
});
modalEdit.setEventListeners();

/** Модалка с подтверждение */
const modalConfirm = new PopupWithConfirmation(".popup_confirm");
modalConfirm.setEventListeners();

/** Модалка с большой картинкой */
const modalImage = new PopupWithImage(".popup_image");
modalImage.setEventListeners();

/** Модалка с добавлением карточки на страницу */
triggerModalAdd.addEventListener("click", () => {
  modalAdd.open();
  addFormValidator.resetValidation();
});

const modalAdd = new PopupWithForm({
  popupSelector: ".popup_add",
  handleFormSubmit: (inputsValues) => {
    modalAdd.renderLoading(true);
    const data = {
      name: inputsValues.title,
      link: inputsValues.link,
    };
    api
      .addNewCard(data)
      .then((res) => {
        const card = createCard(res);
        cardsSection.addItem(card);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        modalAdd.renderLoading(false);
        modalAdd.close();
      });
  },
});
modalAdd.setEventListeners();

/** Редактирование аватара пользователя */
triggerModalAvatar.addEventListener("click", () => {
  modalAvatar.open();
  avatarFormValidator.resetValidation();
});

const modalAvatar = new PopupWithForm({
  popupSelector: ".popup_update-avatar",
  handleFormSubmit: (inputsValues) => {
    modalAvatar.renderLoading(true);
    api
      .setAvatar(inputsValues)
      .then((res) => {
        userInfo.setUserAvatar(res);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        modalAvatar.renderLoading(false);
        modalAvatar.close();
      });
  },
});
modalAvatar.setEventListeners();
