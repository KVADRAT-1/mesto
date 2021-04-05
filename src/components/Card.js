export class Card {
  constructor(data, cardSelector, handleCardClick) {
  this._name = data.name;
  this._link = data.link;
  this._cardSelector = cardSelector;
  this._handleCardClick = handleCardClick
 }

 _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.elements__item')
    .cloneNode(true);

    return cardElement;
  }

  _setEventListeners(element) {
    const elementsTrashButton = element.querySelector('.elements__trash-button');
    const elementsPhoto = element.querySelector('.elements__photo');
    const elementLike = element.querySelector('.elements__like');

    elementsTrashButton.addEventListener('click', function(){
      const elementsItem = elementsTrashButton.closest('.elements__item');
      elementsItem.remove();
    });

    elementLike.addEventListener('click', (e) => {
      e.target.classList.toggle('elements__like_active');
    });

    elementsPhoto.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    const elementsPhoto = this._element.querySelector('.elements__photo');
    elementsPhoto.src = this._link;
    elementsPhoto.alt = this._name;
    this._element.querySelector('.elements__text').textContent = this._name;

    this._setEventListeners(this._element);

    return this._element; 
  }
}