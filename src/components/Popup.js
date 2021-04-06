export class Popup { /*class Popup отвечает за открытие и закрытие попапа.*/
    constructor (popupElement) {
        this.popupElement = popupElement; /*Принимает в конструктор единственный параметр — селектор попапа.*/
        this.functionClose = {
            handleEscClose: (e) => {this._handleEscClose(e)},
            clickPopupClose: (e) => {this._clickPopupClose(e)}
        }
    }
    
    _handleEscClose(e) {
        if (e.key === 'Escape') {
            this.close();
        }
    } /*приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.*/
    
    _clickPopupClose(e) {
        if (e.target === this.popupElement) {
            this.close();
        }
    }   /*приватный метод _clickPopupClose, который содержит логику закрытия попапа по клику на оверлей.*/

    open() {
        this.popupElement.classList.add('popup_opened');
        document.addEventListener('keydown', this.functionClose.handleEscClose);
        this.popupElement.addEventListener('click', this.functionClose.clickPopupClose);
    } /*публичный метод open, который отвечает за открытие попапа.*/

    close() {
        this.popupElement.classList.remove('popup_opened');
        document.removeEventListener('keydown', this.functionClose.handleEscClose);
        this.popupElement.removeEventListener('click', this.functionClose.clickPopupClose);
    } /*публичный метод close, который отвечает за закрытие попапа.*/
    
    setEventListeners() {
        this.popupElement.querySelector('.popup__close-button').addEventListener('click', () => {
            this.close();
        })
    } /*публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа.*/
}