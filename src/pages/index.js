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
  triggerModalProfile,
  triggerModalCard,
  triggerModalAvatar,
  formElementProfile,
  formElementAdd,
  formElementAvatar,
  apiToken,
  apiUrl,
  apiCohortId,
} from "../utils/constants.js";

/** Подключаем API */
const api = new Api(apiToken, apiUrl, apiCohortId);

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

/** Инициализация класса для отрисовки карточек */
const cardsSection = new Section(
  {
    renderer: (data) => {
      const card = createCard(data);
      cardsSection.addItemAppend(card);
    },
  },
  ".elements"
);

/** Функция создания карточки методом класса Card*/
function createCard(data) {
  const newCard = new Card(
    {
      data: data,
      currentUserId: userInfo.getUserId(),
      handleCardClick: (link, name) => {
        modalImage.open(link, name);
      },
      handleDeleteBtn: () => {
        const thisCardId = newCard.getCardId();
        modalConfirm.open();
        modalConfirm.setSubmitConfirm(() => {
          api
            .deleteCard(thisCardId)
            .then(() => {
              newCard.deleteCard();
              modalConfirm.close();
            })
            .catch((err) => {
              console.error(err);
            });
        });
      },
      handleLikeBtn: () => {
        const thisCardId = newCard.getCardId();
        console.log(newCard.isLiked());
        if (newCard.isLiked()) {
          api
            .removeLike(thisCardId)
            .then((res) => {
              newCard.updateLikes(res);
            })
            .catch((err) => {
              console.error(err);
            });
        } else {
          api
            .setLike(thisCardId)
            .then((res) => {
              newCard.updateLikes(res);
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

/** Модалка с редактированием профиля */
const modalProfile = new PopupWithForm({
  popupSelector: ".popup_edit",
  handleFormSubmit: ({ name, job }) => {
    modalProfile.renderLoading(true);
    api
      .editUserInfo({ name, job })
      .then((res) => {
        userInfo.setUserInfo(res);
        modalProfile.close();
      })
      .catch((err) => {
        console.error(err); // выведем ошибку в консоль
      })
      .finally(() => {
        modalProfile.renderLoading(false);
      });
  },
});

function openProfileModal() {
  modalProfile.open();
  profileFormValidator.resetValidation();
  modalProfile.setInputValues(userInfo.getUserInfo());
}

triggerModalProfile.addEventListener("click", openProfileModal);
modalProfile.setEventListeners();

/** Модалка с подтверждение */
const modalConfirm = new PopupWithConfirmation(".popup_confirm");
modalConfirm.setEventListeners();

/** Модалка с большой картинкой */
const modalImage = new PopupWithImage(".popup_image");
modalImage.setEventListeners();

/** Модалка с добавлением карточки на страницу */
const modalCard = new PopupWithForm({
  popupSelector: ".popup_add",
  handleFormSubmit: (inputsValues) => {
    modalCard.renderLoading(true);
    const data = {
      name: inputsValues.title,
      link: inputsValues.link,
    };
    api
      .addNewCard(data)
      .then((res) => {
        const card = createCard(res);
        cardsSection.addItemPrepend(card);
        modalCard.close();
      })
      .catch((err) => console.error(err))
      .finally(() => {
        modalCard.renderLoading(false);
      });
  },
});

function openCardModal() {
  modalCard.open();
  cardFormValidator.resetValidation();
}
triggerModalCard.addEventListener("click", openCardModal);
modalCard.setEventListeners();

/** Модалка редактирования аватара пользователя */
const modalAvatar = new PopupWithForm({
  popupSelector: ".popup_update-avatar",
  handleFormSubmit: (inputsValues) => {
    modalAvatar.renderLoading(true);
    api
      .setAvatar(inputsValues)
      .then((res) => {
        userInfo.setUserAvatar(res);
        modalAvatar.close();
      })
      .catch((err) => console.error(err))
      .finally(() => {
        modalAvatar.renderLoading(false);
      });
  },
});

function openAvatarModal() {
  modalAvatar.open();
  avatarFormValidator.resetValidation();
}

triggerModalAvatar.addEventListener("click", openAvatarModal);
modalAvatar.setEventListeners();

/** Валидация форм */
const profileFormValidator = new FormValidator(
  validationConfig,
  formElementProfile
),
cardFormValidator = new FormValidator(validationConfig, formElementAdd),
avatarFormValidator = new FormValidator(validationConfig, formElementAvatar);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();
