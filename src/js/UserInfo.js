export class UserInfo { /*class UserInfo отвечает за управление отображением информации о пользователе на странице.*/
    constructor (objectSelector) { /*Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.*/
        this.nameSelector = objectSelector.name;
        this.descriptionSelector = objectSelector.description;
    }

    getUserInfo () {
        return objectSelector;
    } /*публичный метод getUserInfo, который возвращает объект с данными пользователя.*/
    
    setUserInfo (newData) {
        this.nameSelector.textContent = newData.nameValue.value;
        this.descriptionSelector.textContent = newData.descriptionValue.value;
    }/*публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.*/
}