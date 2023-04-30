import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
    this._popupImg = this._popup.querySelector('.popup__big-image');
    this._popupDesc = this._popup.querySelector('.popup__figcaption');
  }

  open(imgUrl, imgDesc) {
    this._popupImg.src = imgUrl;
    this._popupImg.alt = imgDesc;
    this._popupImg.textContent = imgDesc;
    super.open();
  }
}
