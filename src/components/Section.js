export class Section { /*class Section отвечает за отрисовку элементов на странице.*/
    constructor({items, renderer}, containerSelector) {  
        this.items = items; /*items — это массив данных, которые нужно добавить на страницу при инициализации класса.*/
        this.renderer = renderer; /*renderer — это функция, которая отвечает за создание и отрисовку данных на странице.*/
        this.containerSelector = containerSelector; /*селектор контейнера, в который нужно добавлять созданные элементы.*/
    }

    renderElements() {
        this.items.forEach((item) => {
            this.addItem(item)
          });
    } /*публичный метод renderElements, который отвечает за отрисовку всех элементов. Отрисовка каждого отдельного элемента должна осуществляться функцией renderer.*/
    
    addItem(item) {
        this.containerSelector.prepend(this.renderer(item));
    } /*публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер.*/
}

/*У класса Section нет своей разметки. Он получает разметку через функцию-колбэк и вставляет её в контейнер.*/