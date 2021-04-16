import { Popup } from "./Popup.js";

export class PopupDelete extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._form = this.popupElement.querySelector(".popup__form");
    this._callback;
  }

  setCallBack(deletFunc) {
    this.open();
    this._callback = deletFunc;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._callback();
      this.setText("Удаление...");
    });
  }
}
