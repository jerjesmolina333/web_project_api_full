import Popup from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(params) {
    super(params.cardSelector);
    this._cardSelector = params.cardSelector;
    this._imageLink = params.imageLnk;
  }
  open(evt) {
    const posYClick = evt.clientY - 100 + "px";
    this._popup = document.querySelector(this._cardSelector);

    this._imagenContainer = this._popup.querySelector(".imagen__container");
    this._imagenContainer.querySelector(".imagen__pic").src = this._imageLink;
    this._imagenContainer.style.top = posYClick;
    this._imagenContainer.style.left = "1px";
    this._popupClose = this._imagenContainer.querySelector(".popup__cerrarIMG");
    this._popup.style.display = "flex";
    this._removed = false;

    this.setEventListeners();
  }
  setEventListeners() {
    this._popupClose.addEventListener("click", (evt) => {
      this.close(evt);
    });
    this._popup.addEventListener("click", (evt) => {
      this.close(evt);
    });
    this._popup.addEventListener("keydown", (evt) => {
      const tecla = evt.key;
      if (evt.key === "Escape") {
        this.close();
      }
    });
    this._imagenContainer.addEventListener("keydown", (evt) => {
      const tecla = evt.key;
      if (evt.key === "Escape") {
        this.close();
      }
    });
  }
}
