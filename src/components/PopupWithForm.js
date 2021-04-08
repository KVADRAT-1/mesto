import {Popup} from './Popup.js'; /*class PopupWithForm наследует от class Popup.*/

export class PopupWithForm extends Popup {
    constructor (popupElement, formSubmissionCallback) {
        super(popupElement);
        this._form = this.popupElement.querySelector('.popup__form');
        this._inputAll = this._form.querySelectorAll('.popup__input')
        this._formSubmissionCallback = formSubmissionCallback.submitHandler;
        /*Кроме селектора попапа принимает в конструктор колбэк сабмита формы.*/
    }

    _getInputValues() {
        const objectInputValue = {};
        for (let i = 0; i < this._inputAll.length; i++) {
            objectInputValue[i] = this._inputAll[i].value;
        }
        return objectInputValue;
    } /*приватный метод _getInputValues, собирает данные всех полей формы.*/

    setEventListeners() { /*Перезаписывает родительский метод setEventListeners.*/
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {evt.preventDefault()});
        this._form.addEventListener('submit', () => {this._formSubmissionCallback(this._getInputValues())});
    } /*публичный метод setEventListeners, добавляет обработчик клика иконке закрытия и добавлять обработчик сабмита формы.*/

    close () { /*Перезаписывает родительский метод close.*/
        super.close();
        this._form.reset();
    } /*при закрытии попапа форма сбрасываться.*/
}

/*Для каждого попапа создавайте свой экземпляр класса PopupWithForm.*/