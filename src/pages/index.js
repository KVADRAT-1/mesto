import './index.css'

import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js'
import { formConfig } from '../utils/formConfig.js'
import { initialCards } from '../utils/initial-сards.js'
import { Section } from '../components/Section.js'
import { UserInfo } from '../components/UserInfo.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { popupProfile, popupAddition, popupPicture, editButton, popupFormProfile, popupFormPicture, 
  profileName, profileDescription, popupInputTextName, popupInputTextDescription, profileAddButton, 
  elementsList, namePicture, linkPicture, popupSubmitButtonPicture, ClassElementsTemplate } from '../utils/constants.js'

const popupImage = new PopupWithImage(popupPicture);
const profileValidation = new FormValidator(popupFormProfile, formConfig);
const cardFormValidator = new FormValidator(popupFormPicture, formConfig);
const userInfo = new UserInfo({name: profileName, description: profileDescription});
const popupEditProfile = new PopupWithForm(popupProfile, {submitHandler: () => {popupFormProfile.addEventListener('submit', submitPopupFormProfile)}});
const popupAddCard = new PopupWithForm(popupAddition, {submitHandler: () => {popupFormPicture.addEventListener('submit', submitPopupFormPicture)}});
const cardList = new Section({items: initialCards, renderer: (item) => {
  const card = new Card(item, ClassElementsTemplate, (name, link) => {
    popupImage.open(name, link);
  });
  const cardElement = card.generateCard();
  return cardElement;
}}, elementsList);

function submitPopupFormProfile(e) {
  e.preventDefault();
  userInfo.setUserInfo({nameValue: popupInputTextName, descriptionValue: popupInputTextDescription});
  popupEditProfile.close(popupInputTextName, popupInputTextDescription);
}

function submitPopupFormPicture(e) {
  e.preventDefault();
  cardList.addItem({name: namePicture.value, link: linkPicture.value});
  popupAddCard.close();
  popupSubmitButtonPicture.disabled = true;
}

function returnUserInfo() {
  popupInputTextName.value = userInfo.getUserInfo().name.textContent;
  popupInputTextDescription.value = userInfo.getUserInfo().description.textContent;
}

cardList.renderElements();

editButton.addEventListener('click', () => {
  profileValidation.clearValidation();
  popupEditProfile.open();
  returnUserInfo();
});

profileAddButton.addEventListener('click', () => {
  popupEditProfile.close(popupInputTextName, popupInputTextDescription);
  cardFormValidator.clearValidation();
  popupAddCard.open();
});

profileValidation.enableValidation();
cardFormValidator.enableValidation();
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupImage.setEventListeners();