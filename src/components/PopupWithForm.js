import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._buttonPopup = this._popup.querySelector(".popup__button");
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._arrInputs = [...this._form.querySelectorAll(".popup__input ")];
  }

  _getInputValues() {
    const inputsValues = Object.fromEntries(new FormData(this._form));
    return inputsValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (e) => {
      this._handleFormSubmit(this._getInputValues());
      e.preventDefault();
    });
  }

  close() {
    this._form.reset();
    super.close();
  }

  setInputValues(data) {
    this._arrInputs.forEach((input) => {
      input.value = data[input.name];
    });
  }

  renderLoading(isLoading) {
    isLoading
      ? (this._buttonPopup.textContent = "Сохранение...")
      : (this._buttonPopup.textContent = "Сохранить");
  }
}
