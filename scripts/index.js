window.addEventListener('DOMContentLoaded', () => {
  let triggerModalEdit = document.querySelector(".profile__edit-btn"),
    modalEdit = document.querySelector(".popup"),
    closeModals = document.querySelector(".popup__close"),
    nameValue = document.querySelector(".profile__title"),
    jobValue = document.querySelector(".profile__sub-title"),
    nameInput = document.querySelectorAll(".popup__input")[0],
    jobInput = document.querySelectorAll(".popup__input")[1],
    formElement = document.querySelector(".popup__container");

  triggerModalEdit.addEventListener("click", () => {
    modalEdit.classList.add("popup_opened");
    nameInput.value = nameValue.textContent;
    jobInput.value = jobValue.textContent;
  });

  function closeModal() {
    modalEdit.classList.remove("popup_opened");
  }

  closeModals.addEventListener("click", closeModal);

  function handleFormSubmit(evt) {
    evt.preventDefault();
    nameValue.textContent = nameInput.value;
    jobValue.textContent = jobInput.value;
    closeModal();
  }

  formElement.addEventListener("submit", handleFormSubmit);
});
