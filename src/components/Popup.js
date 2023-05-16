export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupBtn = this._popup.querySelector(".popup__button");
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(e) {
    if (e.key === "Escape" && this._popup.classList.contains("popup_opened"))
      this.close();
  }

  setEventListeners() {
    this._popup.addEventListener("mousedown", (e) => {
      if (
        e.target.classList.contains("popup_opened") ||
        e.target.classList.contains("popup__close")
      ) {
        this.close();
      }
    });
  }

  renderLoading(isLoading) {
    isLoading
      ? (this._popupBtn.textContent = "Сохранение...")
      : (this._popupBtn.textContent = "Сохранить");
  }
}
