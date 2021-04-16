export class UserAvatar {
  constructor(userAvatarData) {
    this.userAvatarData = userAvatarData;
    this.userAvatar = userAvatarData.link;
  }

  getUserAvatar() {
    return this.userAvatarData;
  }

  setUserAvatar(newData) {
    this.userAvatarAvatar.textContent = newData.linkValue;
  }
}
