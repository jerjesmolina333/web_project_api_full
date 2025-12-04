import { PopupWithImage } from "./PopupWithImage.js";
import { procesaClickEliminarImagen } from "./utils.js";

export class Card {
  constructor(data, cardSelector) {
    this._imageLink = data.link;
    this._name = data.name;
    this._cardSelector = cardSelector;
    this._like = data.isLiked;
    this._id = data.id;
    this._elementTrashed = false;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element__container")
      .cloneNode(true);

    return cardElement;
  }
  _handleCardClick(evt) {
    if (!this._elementTrashed) {
      this._handleOpenPopup(evt);
    } else {
      this._elementTrashed = false;
    }
  }
  _setEventListeners() {
    this._element
      .querySelector(".element__pic")
      .addEventListener("click", (evt) => {
        this._handleCardClick(evt);
      });

    this._element
      .querySelector(".element__trash")
      .addEventListener("click", (evt) => {
        this._handleRemoveElement(evt);
      });
  }
  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".element__pic").src = this._imageLink;
    this._element.querySelector(".element__name").textContent = this._name;
    this._element.querySelector(".element__pic").alt = this._name;
    this._element.querySelector(".img-id").textContent = this._id;
    if (this._like) {
      this._element.querySelector(".element__like").src = "../images/Like2.png";
      this._element.querySelector(".element__liked").textContent = "Liked";
    } else {
      this._element.querySelector(".element__like").src = "../images/Like.png";
      this._element.querySelector(".element__liked").textContent = "No-Liked";
    }
    this._setEventListeners();
    this._elementTrashed = false;
    return this._element;
  }
  _handleOpenPopup(evt) {
    const popup = new PopupWithImage({
      cardSelector: "#modalOverlay",
      imageLnk: this._imageLink,
    });

    popup.open(evt);
  }
  _handleClosePopup(evt) {
    const elem = evt.target;
    const padre1 = elem.parentElement;
    const padre2 = padre1.parentElement;
    padre1.remove();
    padre2.style.display = "none";
  }

  _handleRemoveElement(evt) {
    const element = evt.target;
    const padre1 = element.parentElement;
    const id_imagen = padre1.querySelector(".img-id").textContent;
    procesaClickEliminarImagen(evt, id_imagen, padre1);
  }
}
