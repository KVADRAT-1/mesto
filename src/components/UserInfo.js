export class UserInfo { /*class UserInfo отвечает за управление отображением информации о пользователе на странице.*/
    constructor (userData) { /*Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.*/
        this.userData = userData;
        this.userName = userData.name;
        this.userDescription = userData.description;
    }

    getUserInfo() {
        return this.userData;
    } /*публичный метод getUserInfo, который возвращает объект с данными пользователя.*/
    
    setUserInfo(newData) {
        this.userName.textContent = newData.nameValue;
        this.userDescription.textContent = newData.descriptionValue;
    }/*публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.*/
}