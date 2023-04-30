import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
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

  initialData(data) {
    const name = this._form.querySelector(".popup__input_name"),
      job = this._form.querySelector(".popup__input_job");
    name.value = data.name;
    job.value = data.job;
  }
}
