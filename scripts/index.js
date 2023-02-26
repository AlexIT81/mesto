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
    document.body.style.overflow = "hidden";
    document.body.style.marginRight = verticalScrollbarWidth() + "px";
    nameInput.value = nameValue.textContent;
    jobInput.value = jobValue.textContent;
  });

  function closeModal() {
    modalEdit.classList.remove("popup_opened");
    document.body.style.marginRight = 0;
    document.body.style.overflow = "";
  }

  closeModals.addEventListener("click", () => {
    closeModal();
  });

  function handleFormSubmit(evt) {
    evt.preventDefault();
    nameValue.textContent = nameInput.value;
    jobValue.textContent = jobInput.value;
    closeModal();
  }

  formElement.addEventListener("submit", handleFormSubmit);

  function verticalScrollbarWidth() {
    let outerDiv = document.createElement("div");
    outerDiv.style.visibility = "hidden";
    outerDiv.style.overflowY = "scroll";
    document.body.appendChild(outerDiv);

    let innerDiv = document.createElement("div");
    outerDiv.appendChild(innerDiv);

    let scrollbarWidth = outerDiv.offsetWidth - innerDiv.offsetWidth;
    outerDiv.remove();

    return scrollbarWidth;
  }
});
