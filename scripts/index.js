window.addEventListener("DOMContentLoaded", () => {
  const cardsWrapper = document.querySelector(".elements"),
    triggerModalEdit = document.querySelector(".profile__edit-btn"),
    triggerModalAdd = document.querySelector(".profile__add-btn"),
    modalEdit = document.querySelector(".popup_edit"),
    modalAdd = document.querySelector(".popup_add"),
    modalImage = document.querySelector(".popup_image"),
    closeModalBtns = document.querySelectorAll(".popup__close"),
    nameValue = document.querySelector(".profile__title"),
    jobValue = document.querySelector(".profile__sub-title"),
    nameInput = modalEdit.querySelector(".popup__input_name"),
    jobInput = modalEdit.querySelector(".popup__input_job"),
    formElementEdit = modalEdit.querySelector(".popup__container"),
    formElementAdd = modalAdd.querySelector(".popup__container");
    modalImageFigure = modalImage.querySelector(".popup__big-image"),
    modalImageFigcaption = modalImage.querySelector(".popup__figcaption"),
    cardTemlate = document.querySelector("#element").content,
    titleInput = modalAdd.querySelector(".popup__input_title"),
    linkInput = modalAdd.querySelector(".popup__input_link"),
    modalWindows = document.querySelectorAll('.popup');

  /** Функция открытия и закрытия модального окна */
  function toggleModal(modalWindow) {
    modalWindow.classList.toggle("popup_opened");
  }

  /** Функция закрытия модального окна */
  function closeModal(modal) {
    modal.classList.remove("popup_opened");
  }

  /** Закрытие модалок кнопкой */
  function closeModalByClickOnBtn() {
    closeModalBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        toggleModal(e.target.closest(".popup"));
      });
    });
  }
  closeModalByClickOnBtn();

  /** Закрытие модалки кликом на оверлей */
  function closeModalByClickOnOverlay() {
    modalWindows.forEach((modal) => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal(modal);
        }
      })
    })
  }
  closeModalByClickOnOverlay();

  /** Закрытие модалки нажатием клавиши Esc */
  function closeModalByKeyEsc() {
    modalWindows.forEach((modal) => {
      document.addEventListener('keydown', (e) => {
        console.log(e.key);
        if (e.key === 'Escape') {
          closeModal(modal);
        }
      })
    })
  }
  closeModalByKeyEsc();

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
    cardElementTrash.addEventListener('click', (e) => e.target.closest(".element").remove());
    cardElementImg.addEventListener('click', (e) => {
      createModalImage(e);
      toggleModal(modalImage);
    });
    cardElementIcon.addEventListener('click', (e) => e.target.classList.toggle("element__icon_active"));

    return cardElement;
  }

  /** Функция добавления карточки в DOM */
  function addCard(card) {
    cardsWrapper.prepend(card);
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
    toggleModal(modalEdit);
  }

  /** Функция добавления карточки */
  function handleFormAddSubmit(e) {
    e.preventDefault();
    addCard(createCard(titleInput.value, linkInput.value));
    e.target.reset();
    toggleModal(modalAdd);
  }

  /** Начальное добавление карточек в галерею из массива */
  initialCards.forEach((item) => addCard(createCard(item.name, item.link)));

  /** Редактирование информации о путешественнике */
  triggerModalEdit.addEventListener("click", () => {
    toggleModal(modalEdit);
    nameInput.value = nameValue.textContent;
    jobInput.value = jobValue.textContent;
  });

  formElementEdit.addEventListener("submit", handleFormEditSubmit);

  /** Добавление карточки */
  triggerModalAdd.addEventListener("click", () => toggleModal(modalAdd));
  formElementAdd.addEventListener("submit", handleFormAddSubmit);



});
