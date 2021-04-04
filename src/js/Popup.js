export class Popup { /*class Popup отвечает за открытие и закрытие попапа.*/
    constructor (popupSelector) {
        this.popupSelector = popupSelector; /*Принимает в конструктор единственный параметр — селектор попапа.*/
    }
    
    _handleEscClose () {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.close();
            }
        });
        
    } /*приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.*/
    
    open () {
        this.popupSelector.classList.add('popup_opened');
        this._handleEscClose();
        this.setEventListeners();
    } /*публичный метод open, который отвечает за открытие попапа.*/

    close () {
        this.popupSelector.classList.remove('popup_opened');
    } /*публичный метод close, который отвечает за закрытие попапа.*/
    
    setEventListeners () {
        this.popupSelector.querySelector('.popup__close-button').addEventListener('click', () => {
            this.close();
        })
    } /*публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа.*/
}