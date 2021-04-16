export class UserInfo {
  constructor(userData) {
    this.userData = userData;
    this.userName = userData.name;
    this.userDescription = userData.about;
  }

  getUserInfo() {
    return this.userData;
  }

  setUserInfo(dataUserServer) {
    this.userName.textContent = dataUserServer.name;
    this.userDescription.textContent = dataUserServer.about;
  }
}
