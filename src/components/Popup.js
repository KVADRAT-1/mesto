export class Popup {
  constructor(popupElement) {
    this.popupElement = popupElement;
    this._popupSubmit = popupElement.querySelector(".popup__submit-button");
    this._submitButton = this.popupElement.querySelector(
      ".popup__submit-button"
    );
    this.functionClose = {
      handleEscClose: (e) => {
        this._handleEscClose(e);
      },
      clickPopupClose: (e) => {
        this._clickPopupClose(e);
      },
    };
  }

  setText(text) {
    this._popupSubmit.textContent = text;
    this._submitButton.disabled = true;
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  _clickPopupClose(e) {
    if (e.target === this.popupElement) {
      this.close();
    }
  }

  open() {
    this.popupElement.classList.add("popup_opened");
    document.addEventListener("keydown", this.functionClose.handleEscClose);
    this.popupElement.addEventListener(
      "click",
      this.functionClose.clickPopupClose
    );
  }

  close() {
    this.popupElement.classList.remove("popup_opened");
    document.removeEventListener("keydown", this.functionClose.handleEscClose);
    this.popupElement.removeEventListener(
      "click",
      this.functionClose.clickPopupClose
    );
  }

  setEventListeners() {
    this.popupElement
      .querySelector(".popup__close-button")
      .addEventListener("click", () => {
        this.close();
      });
  }
}
