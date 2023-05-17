import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
    this._imgPopup = this._popup.querySelector('.popup__big-image');
    this._descPopup = this._popup.querySelector('.popup__figcaption');
  }

  open(link, name) {
    this._imgPopup.src = link;
    this._imgPopup.alt = name;
    this._descPopup.textContent = name;
    super.open();
  }
}
