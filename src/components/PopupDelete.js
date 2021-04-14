import { Popup } from './Popup.js'; /*class PopupWithImage наследует от class Popup.*/

export class PopupDelete extends Popup {
    constructor (popupElement) {
        super(popupElement);
        this._form = this.popupElement.querySelector('.popup__form');
    }
    
    setCallBack(deletFunc){
        this.open();
        this._callback = deletFunc;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._callback();
            this.setText("Удаление...");
        });
    }
}