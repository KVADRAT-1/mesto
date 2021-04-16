import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupElement, formSubmissionCallback) {
    super(popupElement);
    this._form = this.popupElement.querySelector(".popup__form");
    this._inputAll = this._form.querySelectorAll(".popup__input");
    this._formSubmissionCallback = formSubmissionCallback.submitHandler;
  }

  _getInputValues() {
    const objectInputValue = {};
    this._inputAll.forEach((input) => {
      objectInputValue[input.name] = input.value;
    });
    return objectInputValue;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._form.addEventListener("submit", () => {
      this._formSubmissionCallback(this._getInputValues());
      this.setText("Загрузка...");
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
