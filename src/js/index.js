import '../pages/index.css'

import {Card} from './Card.js'
import {FormValidator} from './FormValidator.js'
import {formConfig} from './formConfig.js'
import {initialCards} from './initial-сards.js'
import {Section} from './Section.js'
import {UserInfo} from './UserInfo.js'
import {PopupWithForm} from './PopupWithForm.js'
import {PopupWithImage} from './PopupWithImage.js'
import { popupProfile, popupAddition, popupPicture, editButton, popupFormProfile, popupFormPicture, 
  profileName, profileDescription, popupInputTextName, popupInputTextDescription, profileAddButton, 
  elementsList, namePicture, linkPicture, popupSubmitButtonPicture, ClassElementsTemplate } from './constants.js'

const profileValidation = new FormValidator(popupFormProfile, formConfig);
const cardFormValidator = new FormValidator(popupFormPicture, formConfig);
const addUserInfo = new UserInfo({name: profileName, description: profileDescription});
const addPopupProfile = new PopupWithForm(popupProfile, {Submission: () => {popupFormProfile.addEventListener('submit', submitPopupFormProfile)}});
const addPopupWithForm = new PopupWithForm(popupAddition, {Submission: () => {popupFormPicture.addEventListener('submit', submitPopupFormPicture)}});
const addCardList = new Section({items: initialCards, renderer: (item) => {
  const card = new Card(item, ClassElementsTemplate, (name, link) => {
    const addPopupWithImage = new PopupWithImage(popupPicture);
    addPopupWithImage.open(name, link);
  });
  const cardElement = card.generateCard();
  return cardElement
}}, elementsList);

function submitPopupFormProfile(e) {
  e.preventDefault();
  addUserInfo.setUserInfo({nameValue: popupInputTextName, descriptionValue: popupInputTextDescription});
  addPopupProfile.close(popupInputTextName, popupInputTextDescription);
}

function submitPopupFormPicture(e) {
  e.preventDefault();
  addCardList.renderingElement({name: namePicture.value, link: linkPicture.value});
  addPopupWithForm.close();
  popupSubmitButtonPicture.disabled = true;
}

addCardList.renderingElements();

editButton.addEventListener('click', () => {
  profileValidation.clearValidation(),
  addPopupProfile.open()
});

profileAddButton.addEventListener('click', () => {
  addPopupProfile.close(popupInputTextName, popupInputTextDescription), 
  cardFormValidator.clearValidation(), 
  addPopupWithForm.open()
});

profileValidation.enableValidation();
cardFormValidator.enableValidation();