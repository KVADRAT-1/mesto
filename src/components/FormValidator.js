export class FormValidator {
  constructor(form, config) {
    this._form = form;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._errorInputClass = config.errorInputClass;
    this._activeInputClass = config.activeInputClass;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._submitButtonClass = config.submitButtonClass;
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
    this.inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
  }

  _setEventListeners() {
    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showError(inputElement, inputElement.validationMessage);
    } else {
      this._hideError(inputElement);
    }
  }

  _showError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._errorInputClass);
    errorElement.classList.add(this._activeInputClass);
    errorElement.textContent = errorMessage;
  }

  _hideError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._errorInputClass);
    errorElement.classList.remove(this._activeInputClass);
    errorElement.textContent = "";
  }

  _hasInvalidInput() {
    return this.inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  enableValidation() {
    this._setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
  }

  clearValidation() {
    this.inputList.forEach((input) => {
      this._hideError(input);
    });
    this._toggleButtonState();
  }
}
