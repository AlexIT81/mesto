import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
  }

  setSubmitConfirm(action) {
    this._handleSubmitConfirm = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleSubmitConfirm();
    });
  }

  renderLoading(isLoading) {
    isLoading
      ? (this._buttonPopup.textContent = "Сохранение...")
      : (this._buttonPopup.textContent = "Сохранить");
  }
}
