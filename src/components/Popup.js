export class Popup { /*class Popup отвечает за открытие и закрытие попапа.*/
    constructor (popupSelector) {
        this.popupSelector = popupSelector; /*Принимает в конструктор единственный параметр — селектор попапа.*/
    }
    
    _handleEscClose(e) {
        if (e.key === 'Escape') {
            this.close();
        }
    } /*приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.*/
    
    _clickPopupClose(e) {
        if (e.target === this.popupSelector) {
            this.close();
        }
    }   /*приватный метод _clickPopupClose, который содержит логику закрытия попапа по клику на оверлей.*/

    open() {
        this.popupSelector.classList.add('popup_opened');
        document.addEventListener('keydown', (e) => {this._handleEscClose(e)});
        this.popupSelector.addEventListener('click', (e) => {this._clickPopupClose(e)});
    } /*публичный метод open, который отвечает за открытие попапа.*/

    close() {
        this.popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keydown', (e) => {this._handleEscClose(e)});
        this.popupSelector.removeEventListener('click', (e) => {this._clickPopupClose(e)});
    } /*публичный метод close, который отвечает за закрытие попапа.*/
    
    setEventListeners() {
        this.popupSelector.querySelector('.popup__close-button').addEventListener('click', () => {
            this.close();
        })
    } /*публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа.*/
}