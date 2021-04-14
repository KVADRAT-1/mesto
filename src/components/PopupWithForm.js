import { Popup } from './Popup.js'; /*class PopupWithForm наследует от class Popup.*/

export class PopupWithForm extends Popup {
    constructor (popupElement, formSubmissionCallback) {
        super(popupElement);
        this._form = this.popupElement.querySelector('.popup__form');
        this._inputAll = this._form.querySelectorAll('.popup__input');
        this._formSubmissionCallback = formSubmissionCallback.submitHandler;
        /*Кроме селектора попапа принимает в конструктор колбэк сабмита формы.*/
    }

    _getInputValues() {
        const objectInputValue = {};
        this._inputAll.forEach((input) => {
            if(input.name === 'kebab-case' || input.name === 'popup__input_name_picture') {
                objectInputValue.name = input.value;
            }else {
                objectInputValue.link = input.value;
            }
        })
        return objectInputValue;
    } /*приватный метод _getInputValues, собирает данные всех полей формы.*/

    setEventListeners() { /*Перезаписывает родительский метод setEventListeners.*/
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {evt.preventDefault()});
        this._form.addEventListener('submit', () => {
            this._formSubmissionCallback(this._getInputValues());
            this.setText("Загрузка...");
        });
    } /*публичный метод setEventListeners, добавляет обработчик клика иконке закрытия и добавлять обработчик сабмита формы.*/

    close () { /*Перезаписывает родительский метод close.*/
        super.close();
        this._form.reset();
    } /*при закрытии попапа форма сбрасываться.*/
}