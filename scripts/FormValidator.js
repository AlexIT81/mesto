class FormValidator {
  constructor(data, formSelector) {
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._formSelector = formSelector;
    this._inputsList = [...this._formSelector.querySelectorAll(this._inputSelector)];
    this._buttonElement = this._formSelector.querySelector(this._submitButtonSelector);
  }

  /** Показ ошибки инпута */
  _showInputError(inputElement) {
    const errorElement = this._formSelector.querySelector(`.${inputElement.name}-input-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  /** Скрытие ошибки инпута */
  _hideInputError (inputElement) {
    const errorElement = this._formSelector.querySelector(`.${inputElement.name}-input-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  };

  /** Метод очистки ошибок инпутов формы, запускаемый при открытии модалки  */
  clearInputsError() {
    this._inputsList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  /** Тоглим ошибки импута */
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  };

  /** Проверка инпутов формы на валидность */
  _doAllInputsValid()  {
    return this._inputsList.every((inputElement) => {
      return inputElement.validity.valid;
    });
  };

  /** Тоглим кнопку отправки формы */
  _toggleButtonState() {
    if (this._doAllInputsValid()) {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled");
    } else {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute("disabled", true);
    }
  };

  /** Навешиваем обработчик на инпуты и кнопку входящей формы */
  _setEventListeners() {
    this._toggleButtonState();
    this._inputsList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  enableValidation() {
    this._setEventListeners();
    this._formSelector.addEventListener("submit", (e) => {
      e.preventDefault();
      this._toggleButtonState();
    });
  }
}

export { FormValidator };
