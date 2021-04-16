import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupElement) {
    super(popupElement);
  }

  open(name, link) {
    super.open();
    const popupText = this.popupElement.querySelector("#popup__text");
    const popupPhoto = this.popupElement.querySelector(".popup__photo");
    popupPhoto.alt = name;
    popupPhoto.src = link;
    popupText.textContent = name;
  }
}
