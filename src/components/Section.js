export class Section {
  constructor({ renderer }, containerSelector) {
    this.renderer = renderer;
    this.containerSelector = containerSelector;
  }

  addItem(item, userData) {
    let userInfo = userData;
    this.containerSelector.prepend(this.renderer(item, userInfo));
  }
}
