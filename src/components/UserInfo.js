export class UserInfo { /*class UserInfo отвечает за управление отображением информации о пользователе на странице.*/
    constructor (userData) { /*Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.*/
        this.userData = userData;
        this.userName = userData.name;
        this.userDescription = userData.about;
    }

    getUserInfo() {
        return this.userData;
    } /*публичный метод getUserInfo, который возвращает объект с данными пользователя.*/
    
    setUserInfo(dataUserServer) {
        this.userName.textContent = dataUserServer.name;
        this.userDescription.textContent = dataUserServer.about;
    }/*публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.*/
}