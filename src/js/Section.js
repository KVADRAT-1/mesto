export class Section { /*class Section отвечает за отрисовку элементов на странице.*/
    constructor({items, renderer}, containerSelector) {  
        this.items = items; /*items — это массив данных, которые нужно добавить на страницу при инициализации класса.*/
        this.renderer = renderer; /*renderer — это функция, которая отвечает за создание и отрисовку данных на странице.*/
        this.containerSelector = containerSelector; /*селектор контейнера, в который нужно добавлять созданные элементы.*/
    }

    renderingElements() {
        this.items.forEach((item) => {
            this.renderingElement(item)
          });
    } /*публичный метод renderingElements, который отвечает за отрисовку всех элементов. Отрисовка каждого отдельного элемента должна осуществляться функцией renderer.*/
    
    renderingElement(item) {
        this.addItem(this.renderer(item), this.containerSelector);
    }

    addItem(cardElement, container) {
        container.prepend(cardElement);
    } /*публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер.*/
}

/*У класса Section нет своей разметки. Он получает разметку через функцию-колбэк и вставляет её в контейнер.*/