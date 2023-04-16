class FormValidator {
  constructor(data, formSelector) {
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._formSelector = formSelector;
    this._inputsList = [...this._formSelector.querySelectorAll(this._inputSelector)];
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
    const buttonElement = this._formSelector.querySelector(this._submitButtonSelector);
    if (this._doAllInputsValid()) {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute("disabled");
    } else {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute("disabled", true);
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
    });
  }
}

export { FormValidator };
