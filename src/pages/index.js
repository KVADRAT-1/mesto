import './index.css';

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { formConfig } from "../utils/formConfig.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupDelete } from "../components/PopupDelete.js";
import { PopupAvatar } from "../components/PopupProfileAvatar.js";
import { Api } from "../components/Api.js";
import {
  popupProfile,
  popupAddition,
  popupPicture,
  editButton,
  popupFormProfile,
  popupFormPicture,
  profileName,
  profileDescription,
  popupInputTextName,
  popupInputTextDescription,
  profileAddButton,
  elementsList,
  popupSubmitButtonPicture,
  classElementsTemplate,
  popupDeletePicture,
  popupProfileAvatar,
  avatar,
  avatarContainer,
} from "../utils/constants.js";

const popupImage = new PopupWithImage(popupPicture);
const popupDeleteImage = new PopupDelete(popupDeletePicture);
const profileValidation = new FormValidator(popupFormProfile, formConfig);
const cardFormValidator = new FormValidator(popupFormPicture, formConfig);
const avatarFormValidator = new FormValidator(popupProfileAvatar, formConfig);
const userInfo = new UserInfo({ name: profileName, about: profileDescription });
const popupEditProfile = new PopupWithForm(popupProfile, {
  submitHandler: (objectInputValue) => {
    submitPopupFormProfile(objectInputValue);
  },
});
const popupAddCard = new PopupWithForm(popupAddition, {
  submitHandler: (objectInputValue) => {
    submitPopupFormPicture(objectInputValue);
  },
});
const profileAvatar = new PopupAvatar(popupProfileAvatar, {
  submitHandler: (objectInputValue) => {
    submitpopupProfileAvatar(objectInputValue);
  },
});
const cardList = new Section(
  {
    renderer: (item, userData) => {
      const card = new Card(
        item,
        userData,
        classElementsTemplate,
        {
          openPopupImage: (name, link) => {
            popupImage.open(name, link);
          },
          openPopupDeleteImage: (deleteCard) => {
            popupDeleteImage.setCallBack(deleteCard);
          },
        },
        {
          addLikeServer: (cardId) => {
            return addLikeServer(cardId);
          },
          deleteLikeServer: (cardId) => {
            return deleteLikeServer(cardId);
          },
          deleteCardServer: (cardId) => {
            return deleteCardServer(cardId);
          },
        },
        () => {
          popupDeleteImage.setText("????");
          popupDeleteImage.close();
        }
      );
      const cardElement = card.generateCard();
      return cardElement;
    },
  },
  elementsList
);
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-22",
  headers: {
    authorization: "2c8f1154-7802-4bb0-9c57-35d128128b7a",
    "Content-Type": "application/json",
  },
});

function submitpopupProfileAvatar(objectInputValue) {
  userAvatarServer({ avatar: objectInputValue.value });
}

function submitPopupFormProfile(objectInputValue) {
  userInformationServer({
    name: objectInputValue.nameProfile,
    about: objectInputValue.nameAbout,
  });
}

function submitPopupFormPicture(objectInputValue) {
  addCardServer(objectInputValue);
  popupSubmitButtonPicture.disabled = true;
}

function returnUserInfo() {
  popupInputTextName.value = userInfo.getUserInfo().name.textContent;
  popupInputTextDescription.value = userInfo.getUserInfo().about.textContent;
}

editButton.addEventListener("click", () => {
  popupEditProfile.setText("??????????????????");
  profileValidation.clearValidation();
  popupEditProfile.open();
  returnUserInfo();
});

profileAddButton.addEventListener("click", () => {
  popupEditProfile.close(popupInputTextName, popupInputTextDescription);
  cardFormValidator.clearValidation();
  popupAddCard.open();
});

avatarContainer.addEventListener("click", () => {
  profileAvatar.setText("??????????????????");
  avatarFormValidator.clearValidation();
  profileAvatar.open();
});

Promise.all([api.getInitialCards(), api.getUserInformation()])
  .then(([cardsArray, userData]) => {
    cardsArray.reverse().forEach((el) => {
      cardList.addItem(el, userData);
    });
    avatar.src = userData.avatar;
    userInfo.setUserInfo(userData);
  })
  .catch((err) => {
    console.log("???????????? ?????? ?????????????????? ????????????????");
  });

function userInformationServer(dataUser) {
  api
    .addUserInformation(dataUser)
    .then((dataUser) => {
      userInfo.setUserInfo(dataUser);
      popupEditProfile.close(popupInputTextName, popupInputTextDescription);
    })
    .catch((err) => {
      console.log("???????????? ?????? ?????????????????? ???????????????????? ?? ????????????????????????");
    });
}

function userAvatarServer(dataAvatar) {
  api
    .addUserAvatar(dataAvatar)
    .then((dataUser) => {
      avatar.src = dataUser.avatar;
      profileAvatar.close();
    })
    .catch((err) => {
      console.log("???????????? ?????? ?????????????????? ????????????????");
    });
}

function addCardServer(dataCard) {
  Promise.all([api.getCard(dataCard), api.getUserInformation()])
    .then(([dataCardServer, userData]) => {
      cardList.addItem(dataCardServer, userData);
      popupAddCard.close();
    })
    .catch((err) => {
      console.log("???????????? ?????? ?????????????????? ????????????????");
    });
}

function addLikeServer(cardId) {
  return api
    .addLike(cardId)
    .then((like) => {
      return like;
    })
    .catch((err) => {
      console.log("???????????? ?????? ???????????????????? ??????????");
    });
}

function deleteLikeServer(cardId) {
  return api
    .deleteLike(cardId)
    .then((like) => {
      return like;
    })
    .catch((err) => {
      console.log("???????????? ?????? ???????????????? ??????????");
    });
}

function deleteCardServer(cardId) {
  return api
    .deleteCard(cardId)
    .then((deletecard) => {
      return deletecard;
    })
    .catch((err) => {
      console.log("???????????? ?????? ???????????????? ????????????????");
    });
}

avatarFormValidator.enableValidation();
profileValidation.enableValidation();
cardFormValidator.enableValidation();
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupImage.setEventListeners();
profileAvatar.setEventListeners();
popupDeleteImage.setEventListeners();
