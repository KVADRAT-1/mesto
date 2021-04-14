import { Popup } from './Popup.js'; /*class PopupWithImage наследует от class Popup.*/

export class PopupAvatar extends Popup {
    constructor (popupElement, formSubmissionCallback) {
        super(popupElement);
        this._form = this.popupElement.querySelector('.popup__form');
        this._input = this._form.querySelector('.popup__input');
        this._formSubmissionCallback = formSubmissionCallback.submitHandler;
    }

    setEventListeners() { 
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {evt.preventDefault()});
        this._form.addEventListener('submit', () => {
            this._formSubmissionCallback(this._input);
            this.setText('Загрузка...');
        });
    }

    close() {
        super.close();
        this._form.reset();
    }
}