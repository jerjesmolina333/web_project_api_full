export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  close(evt) {
    if (!this._removed) {
      const elem = evt.target;
      this._popup.classList.remove("visible");
      this._popup.style.display = "none";
      this._removed = true;
    }
  }
}
