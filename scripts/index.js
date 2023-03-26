window.addEventListener("DOMContentLoaded", () => {
  const cardWrapper = document.querySelector(".elements"),
    triggerModalEdit = document.querySelector(".profile__edit-btn"),
    triggerModalAdd = document.querySelector(".profile__add-btn"),
    modalEdit = document.querySelector(".popup_edit"),
    modalAdd = document.querySelector(".popup_add"),
    modalImage = document.querySelector(".popup_image"),
    nameValue = document.querySelector(".profile__title"),
    jobValue = document.querySelector(".profile__sub-title"),
    nameInput = modalEdit.querySelector(".popup__input_name"),
    jobInput = modalEdit.querySelector(".popup__input_job"),
    formElementEdit = document.forms["edit"],
    formElementAdd = document.forms["add"],
    modalImageFigure = modalImage.querySelector(".popup__big-image"),
    modalImageFigcaption = modalImage.querySelector(".popup__figcaption"),
    cardTemlate = document.querySelector("#element").content,
    titleInput = modalAdd.querySelector(".popup__input_title"),
    linkInput = modalAdd.querySelector(".popup__input_link"),
    modalWindows = document.querySelectorAll(".popup");

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
      if (e.target.classList.contains("popup_opened")) {
        closeModal(modal);
      }
      if (e.target.classList.contains("popup__close")) {
        closeModal(modal);
      }
    });
  });

  /** Функция создания карточки */
  function createCard(cardName, cardLink) {
    const cardElement = cardTemlate.querySelector(".element").cloneNode(true),
      cardElementImg = cardElement.querySelector(".element__img"),
      cardElementTitle = cardElement.querySelector(".element__title"),
      cardElementTrash = cardElement.querySelector(".element__trash"),
      cardElementIcon = cardElement.querySelector(".element__icon");
    cardElementImg.src = cardLink;
    cardElementImg.alt = cardName;
    cardElementTitle.textContent = cardName;
    cardElementTrash.addEventListener("click", (e) =>
      e.target.closest(".element").remove()
    );
    cardElementImg.addEventListener("click", (e) => {
      createModalImage(e);
      openModal(modalImage);
    });
    cardElementIcon.addEventListener("click", (e) =>
      e.target.classList.toggle("element__icon_active")
    );
    return cardElement;
  }

  /** Функция добавления карточки в DOM */
  function addCard(card) {
    cardWrapper.prepend(card);
  }

  /** Функция генерации модального окна с картинкой из карточки */
  function createModalImage(e) {
    const imgUrl = e.target.src,
      imgDescription = e.target.alt;

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

  /** Функция добавления карточки */
  function handleFormAddSubmit(e) {
    e.preventDefault();
    addCard(createCard(titleInput.value, linkInput.value));
    e.target.reset();
    const submitBtn = e.target.querySelector(".popup__button");
    submitBtn.classList.add("popup__button_disabled");
    submitBtn.setAttribute("disabled", true);
    closeModal(modalAdd);
  }

  /** Начальное добавление карточек в галерею из массива */
  initialCards.forEach((item) => addCard(createCard(item.name, item.link)));

  /** Редактирование информации о путешественнике */
  triggerModalEdit.addEventListener("click", () => {
    openModal(modalEdit);
    nameInput.value = nameValue.textContent;
    jobInput.value = jobValue.textContent;
  });

  formElementEdit.addEventListener("submit", handleFormEditSubmit);

  /** Добавление карточки */
  triggerModalAdd.addEventListener("click", () => openModal(modalAdd));
  formElementAdd.addEventListener("submit", handleFormAddSubmit);
});
