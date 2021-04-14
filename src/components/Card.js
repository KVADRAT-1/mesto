export class Card {
  constructor(cardData, userData, cardSelector, handleCardClick, api, closePopup) {
  this._name = cardData.name;
  this._link = cardData.link;
  this._likes = cardData.likes;
  this._id = cardData._id;
  this._owner = cardData.owner
  this._userData = userData;
  this._cardSelector = cardSelector;
  this._handleCardClick = handleCardClick.openPopupImage;
  this._openPopupDeleteImage = handleCardClick.openPopupDeleteImage;
  this._addLikeServer = api.addLikeServer;
  this._deleteLikeServer = api.deleteLikeServer;
  this._deleteCardServer = api.deleteCardServer;
  this._closeDeletePopUp = closePopup;
 }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.elements__item')
    .cloneNode(true);
    return cardElement;
  }

  _getLike(element) {
    const elementLike = element.querySelector('.elements__like');
    this._likes.forEach((el) => {
      if (el._id === this._userData._id) {
        elementLike.classList.add('elements__like_active');
      }
    })
  }

  _likeChecking(e, elementsLikeQuantity) {
    if (e.target.classList[1] === 'elements__like_active') {
      this._deleteLikeServer(this._id).then(res => {
        e.target.classList.remove('elements__like_active');
        elementsLikeQuantity.textContent = res.likes.length;
      });
    } else {
      this._addLikeServer(this._id).then(res => {
        e.target.classList.add('elements__like_active');
        elementsLikeQuantity.textContent = res.likes.length;
      });
    }
  }

  _deleteCard(elementsItem) {
    this._openPopupDeleteImage(() => {this._deleteCardServer(this._id).then(res => {
      elementsItem.remove();
      this._closeDeletePopUp();
    })});
  }

  _setEventListeners(element, elementsTrashButton, elementsPhoto) {
    const elementLike = element.querySelector('.elements__like');
    const elementsLikeQuantity = element.querySelector('.elements__like-quantity');
    const elementsItem = elementsTrashButton.closest('.elements__item');
    
    elementsTrashButton.addEventListener('click', () => {this._deleteCard(elementsItem)});
    elementLike.addEventListener('click', (e) => {this._likeChecking(e, elementsLikeQuantity)});
    elementsPhoto.addEventListener('click', () => {this._handleCardClick(this._name, this._link)});
  }

  generateCard() {
    this._element = this._getTemplate();
    const elementsPhoto = this._element.querySelector('.elements__photo');
    const elementLikeQuantity = this._element.querySelector('.elements__like-quantity');
    const elementsTrashButton = this._element.querySelector('.elements__trash-button');

    elementLikeQuantity.textContent = this._likes.length;
    elementsPhoto.src = this._link;
    elementsPhoto.alt = this._name;
    this._element.querySelector('.elements__text').textContent = this._name;
    if (this._owner._id === this._userData._id) {elementsTrashButton.style.display = 'block'};

    this._getLike(this._element);
    this._setEventListeners(this._element, elementsTrashButton, elementsPhoto);

    return this._element; 
  }
}