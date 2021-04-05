import {Popup} from './Popup.js'; /*class PopupWithForm наследует от class Popup.*/

export class PopupWithForm extends Popup {
    constructor (popupSelector, formSubmissionCallback) {
        super(popupSelector);
        this._form = this.popupSelector.querySelector('.popup__form');
        this.formSubmissionCallback = formSubmissionCallback.submitHandler;
        /*Кроме селектора попапа принимает в конструктор колбэк сабмита формы.*/
    }

    _getInputValues() {
        return this._form.querySelectorAll('.popup__input');
    } /*приватный метод _getInputValues, собирает данные всех полей формы.*/

    setEventListeners() { /*Перезаписывает родительский метод setEventListeners.*/
        super.setEventListeners();
        this.formSubmissionCallback(this._getInputValues());
    } /*публичный метод setEventListeners, добавляет обработчик клика иконке закрытия и добавлять обработчик сабмита формы.*/

    close () { /*Перезаписывает родительский метод close.*/
        super.close();
        this._form.reset();
    } /*при закрытии попапа форма сбрасываться.*/
}

/*Для каждого попапа создавайте свой экземпляр класса PopupWithForm.*/