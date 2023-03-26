function enableValidation(obj) {
  /** Показ ошибки инпута */
  const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
    inputElement.classList.add(obj.inputErrorClass);
    errorElement.classList.add(obj.errorClass);
    errorElement.textContent = errorMessage;
  };

  /** Скрытие ошибки инпута */
  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(
      `.${inputElement.name}-input-error`
    );
    inputElement.classList.remove(obj.inputErrorClass);
    errorElement.classList.remove(obj.errorClass);
    errorElement.textContent = "";
  };

  /** Тоглим ошибки импута */
  const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };

  /** Проверка инпутов формы на валидность */
  const doAllInputsValid = (inputList) => {
    return inputList.every((inputElement) => {
      return inputElement.validity.valid;
    });
  };

  /** Тоглим кнопку отправки формы */
  const toggleButtonState = (inputList, buttonElement) => {
    if (doAllInputsValid(inputList)) {
      buttonElement.classList.remove(obj.inactiveButtonClass);
      buttonElement.removeAttribute("disabled");
    } else {
      buttonElement.classList.add(obj.inactiveButtonClass);
      buttonElement.setAttribute("disabled", true);
    }
  };

  /** Навешиваем обработчик на инпуты и кнопку входящей формы */
  const setEventListeners = (formElement) => {
    const inputList = Array.from(
      formElement.querySelectorAll(obj.inputSelector)
    );
    const buttonElement = formElement.querySelector(obj.submitButtonSelector);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };

  /** Отменяем дефолтное поведение сабмита и отправляем каждую форму в функцию навешивания обработчиков */
  Array.from(document.querySelectorAll(obj.formSelector)).forEach((formElement) => {
      setEventListeners(formElement);
      formElement.addEventListener("submit", function (evt) {
        evt.preventDefault();
      });
    }
  );
}

enableValidation(validationConfig);
