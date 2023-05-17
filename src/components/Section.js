export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItemPrepend(element) {
    this._container.prepend(element);
  }

  addItemAppend(element) {
    this._container.append(element);
  }

  rendererItems(items) {
    items.forEach(item => {
      this._renderer(item);
    })
  }
}
