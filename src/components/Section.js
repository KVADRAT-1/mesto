export class Section { /*class Section отвечает за отрисовку элементов на странице.*/
    constructor({renderer}, containerSelector) {
        this.renderer = renderer; /*renderer — это функция, которая отвечает за создание и отрисовку данных на странице.*/
        this.containerSelector = containerSelector; /*селектор контейнера, в который нужно добавлять созданные элементы.*/
    }

    addItem(item, userData) {
        let userInfo = userData
        this.containerSelector.prepend(this.renderer(item, userInfo));
    } /*публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер.*/
}

/*У класса Section нет своей разметки. Он получает разметку через функцию-колбэк и вставляет её в контейнер.*/