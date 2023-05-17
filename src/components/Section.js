export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  rendererItems(items) {
    items.forEach(item => {
      this._renderer(item);
    })
  }
}
