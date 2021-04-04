import {Popup} from './Popup.js'; /*class PopupWithForm наследует от class Popup.*/

export class PopupWithForm extends Popup {
    constructor (popupSelector, formSubmissionCallback) {
        super(popupSelector);
        this.popupSelector = popupSelector;
        this.formSubmissionCallback = formSubmissionCallback.Submission;
        /*Кроме селектора попапа принимает в конструктор колбэк сабмита формы.*/
    }

    _getInputValues() {
        return this.popupSelector.querySelectorAll('.popup__input');
        
    } /*приватный метод _getInputValues, собирает данные всех полей формы.*/

    setEventListeners() { /*Перезаписывает родительский метод setEventListeners.*/
        super.setEventListeners();
        this.formSubmissionCallback();
    } /*публичный метод setEventListeners, добавляет обработчик клика иконке закрытия и добавлять обработчик сабмита формы.*/

    close () { /*Перезаписывает родительский метод close.*/
        super.close();
        this._getInputValues()[0].value = '';
        this._getInputValues()[1].value = '';
    } /*при закрытии попапа форма сбрасываться.*/
}

/*Для каждого попапа создавайте свой экземпляр класса PopupWithForm.*/