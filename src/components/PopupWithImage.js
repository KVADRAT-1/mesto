import {Popup} from './Popup.js'; /*class PopupWithImage наследует от class Popup.*/

export class PopupWithImage extends Popup { /*class PopupWithImage перезаписывает родительский метод open.*/
    constructor (popupElement) {
        super(popupElement);
    }

    open(name,link) {
        super.open();
        const popupText = this.popupElement.querySelector('#popup__text');
        const popupPhoto = this.popupElement.querySelector('.popup__photo');
        popupPhoto.alt = name;
        popupPhoto.src = link;
        popupText.textContent = name;
    } /*публичный метод open, вставляет в попап картинку и атрибут src изображения и подпись к картинке.*/
}