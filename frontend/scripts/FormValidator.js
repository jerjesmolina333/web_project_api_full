export class FormValidator {
  constructor(paramsValidation, elemento) {
    this._formSelector = paramsValidation.formSelector;
    // this._elemento = elemento;
    this._elemento = paramsValidation.inputSelector;
    this._submitButton = paramsValidation.submitButtonSelector;
    this._inactiveButtonClass = paramsValidation.inactiveButtonClass;
    this._inputErrorClass = paramsValidation.inputErrorClass;
  }
  _getFormsList() {
    const fList = Array.from(document.querySelectorAll(this._formSelector));
    return fList;
  }
  _preventDefault(forms) {
    forms.forEach((formElement) => {
      formElement.addEventListener("submit", function (evt) {
        evt.preventDefault;
      });
    });
  }

  _hasInvalidInput(inputList, inputElement) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  _toggleButtonState(inputList, buttonElement, inputElement) {
    if (this._hasInvalidInput(inputList, inputElement)) {
      buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }

  _showInputError(formElement, inputElement, errorMessage) {
    // console.log("errorMessage: " + errorMessage);
    // console.log("inputElement.id: " + inputElement.id);
    // console.log("this._inputErrorClass: " + this._inputErrorClass);
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    // errorElement.classList.add("form__input_type_error");
    errorElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
  }

  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  _setEventListeners(formElement, inputList, buttonElement, inputElement) {
    inputElement.addEventListener("input", () => {
      this._checkInputValidity(formElement, inputElement);
      this._toggleButtonState(inputList, buttonElement, inputElement);
    });

    this._toggleButtonState(inputList, buttonElement);
  }

  enableValidation() {
    const forms = this._getFormsList();
    this._preventDefault(forms);
    forms.forEach((formElement) => {
      const fieldSet = formElement.querySelector(".form__set");
      const buttonElement = fieldSet.querySelector(this._submitButton);
      const listaCampos = Array.from(fieldSet.querySelectorAll(this._elemento));
      listaCampos.forEach((inputField) => {
        this._setEventListeners(
          formElement,
          listaCampos,
          buttonElement,
          inputField
        );
      });
    });
  }
}

const enableValidation = (paramsVal) => {
  const formList = Array.from(
    document.querySelectorAll(paramsVal.formSelector)
  );

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    const fieldsetList = Array.from(formElement.querySelectorAll(".form__set"));

    fieldsetList.forEach((fieldset) => {
      this._setEventListeners(
        fieldset,
        paramsVal.inputSelector,
        paramsVal.submitButtonSelector,
        paramsVal.inactiveButtonClass
      );
    });
  });
};
