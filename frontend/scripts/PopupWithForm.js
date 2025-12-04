import Popup from "./Popup.js";
import api from "../src/utils/Api.js";
import { UserInfo } from "./UserInfo.js";
import { Card } from "./Card.js";

export class PopupWithForm extends Popup {
  constructor(params, marcado, contenedorImagen) {
    super(params.popupSelector);
    this._fondoSelector = params.fondoSelector;
    this._containerSelector = params.containerSelector;
    this._templateSelector = params.templateSelector;
    this._formSelector = params.formSelector;
    this._primerCampoTextoSelector = params.primerCampoTexto;
    this._marcado = marcado;
    if (contenedorImagen) {
      this._contenedorImag = contenedorImagen;
    }
  }

  open(evt) {
    this._fondo = document.querySelector(this._fondoSelector);
    const formTemplate = document.querySelector(this._templateSelector).content;
    const formContainer = formTemplate
      .querySelector(this._containerSelector)
      .cloneNode(true);

    formContainer.insertAdjacentHTML("afterbegin", this._marcado);
    if (this._contenedorImag) {
      this._id_imagen = formContainer.querySelector(".img-id").textContent;
    }

    this._fondo.append(formContainer);
    this._form = formContainer.querySelector(this._formSelector);
    this._primerCampoTexto = formContainer.querySelector(
      this._primerCampoTextoSelector
    );

    this._primerCampoTexto.focus();
    this._fondo.style.display = "flex";
    this._setEventListeners();
  }

  // Coloca los textos en la edición del Perfil de Usuario
  setTextEP() {
    const nombre = document.querySelector(".profile__name");
    const profesion = document.querySelector(".profile__profession");

    this._inputNombre = this._form.querySelector("#nombre");
    this._inputAcerca = this._form.querySelector("#acerca");

    this._inputNombre.value = nombre.textContent;
    this._inputAcerca.value = profesion.textContent;
  }

  _close(evt) {
    const element = evt.target;
    const padre1 = element.parentElement;
    padre1.remove();
    this._fondo.style.display = "none";
  }

  // Evento submit de la Edición del Perfil de Usuario:
  _attendSubmitEP(evt) {
    const nombre = this._form.querySelector("#nombre");
    const profesion = this._form.querySelector("#acerca");
    const nombrePerfil = document.querySelector(".profile__name");
    const profesionPerfil = document.querySelector(".profile__profession");
    this._getInputValuesEP();

    const params = {
      userName: this._inputNombre.value,
      userAbout: this._inputAcerca.value,
    };

    const userInfo = new UserInfo(params);
    userInfo.setUserInfo();

    nombrePerfil.textContent = nombre.value;
    profesionPerfil.textContent = profesion.value;
    this._nombre = nombre.value;
    this._about = profesion.value;
    this._botonEnviar = this._form.querySelector(".popup__button");
    this._botonEnviar.textContent = "Guardando...";

    const jsonParam = JSON.stringify({
      name: this._nombre,
      about: this._about,
    });

    const objParams = {
      method: "PATCH",
      headers: {
        authorization: "082ad1cf-6751-4277-bd54-4a8ddfdec0e7",
        "Content-Type": "application/json",
      },
      body: jsonParam,
    };

    const apiEP = new Api(
      {
        link: "https://around-api.es.tripleten-services.com/v1/users/me",
      },
      objParams
    );
    apiEP._actualizaUsuario(this._nombre, this._about);

    this._fondo.style.display = "none";
  }

  // Proceso submit para actualizar la imagen del avatar:
  _attendSubmitEdImg(evt) {
    this._botonEnviar = this._form.querySelector(".popup__button");
    this._botonEnviar.textContent = "Guardando...";

    const newLink = this._form.querySelector("#link").value;

    const jsonParam = JSON.stringify({
      avatar: newLink,
    });

    const objParams = {
      method: "PATCH",
      headers: {
        authorization: "082ad1cf-6751-4277-bd54-4a8ddfdec0e7",
        "Content-Type": "application/json",
      },
      body: jsonParam,
    };

    const apiAA = new Api(
      {
        link: "https://around-api.es.tripleten-services.com/v1/users/me/avatar",
      },
      objParams
    );
    apiAA._actualizaAvatar(newLink);

    this._close(evt);
  }

  // Proceso submit para eliminar imagen:
  _attendSubmitEI(evt) {
    if (!this._elementTrashed) {
      const element = evt.target;
      // console.log("this._id_imagen:" + this._id_imagen);
      this._botonEnviar = this._form.querySelector(".popup__button");
      this._contenedorImag.remove();
      this._elementTrashed = true;
      this._botonEnviar.textContent = "Eliminando...";

      const tempOrden = `https://around-api.es.tripleten-services.com/v1/cards/${this._id_imagen}`;

      fetch(tempOrden, {
        method: "DELETE",
        headers: {
          authorization: "082ad1cf-6751-4277-bd54-4a8ddfdec0e7",
        },
      })
        .then(function (res) {
          return res.json();
        })
        .then(function (data, evt) {})
        .catch(function (error) {
          console.log(error);
          return Promise.reject(`Error: ${error}`);
        });
      this._close(evt);
    }
  }

  // Proceso para agregar una nueva imagen (New Place):
  _attendSubmitNP(evt) {
    const cardsContainer = document.querySelector(".elements");

    this._getInputValuesNP();

    let titulo = this._nuevoTitulo;
    let imageLink = this._nuevoLink;
    let thisCard = { name: this._nuevoTitulo, link: this._nuevoLink };
    const elemento = new Card(thisCard, "#element");
    const cardElement = elemento.generateCard();

    cardsContainer.prepend(cardElement);

    this._botonEnviar = this._form.querySelector(".popup__button");
    this._botonEnviar.textContent = "Guardando...";

    const jsonParam = JSON.stringify({
      name: this._nuevoTitulo,
      link: this._nuevoLink,
    });

    const objParams = {
      method: "POST",
      headers: {
        authorization: "082ad1cf-6751-4277-bd54-4a8ddfdec0e7",
        "Content-Type": "application/json",
      },
      body: jsonParam,
    };
    const apiNuevaImagen = new Api(
      {
        link: "https://around-api.es.tripleten-services.com/v1/cards/",
      },
      objParams
    );
    apiNuevaImagen._insertaImagen(this._nuevoTitulo, this._nuevoLink);

    this._close(evt);
  }

  _setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      if (this._formSelector == ".popup__formEP") {
        this._attendSubmitEP(evt);
      }
      if (this._formSelector == ".popup__formNP") {
        this._attendSubmitNP(evt);
      }
      if (this._formSelector == ".popup__formEI") {
        this._attendSubmitEI(evt);
      }
      if (this._formSelector == ".popup__formEdImg") {
        this._attendSubmitEdImg(evt);
      }
    });

    this._botonCerrar = document.querySelector(".popup__cerrar");
    this._botonCerrar.addEventListener("click", (evt) => {
      this._close(evt);
    });

    this._primerCampoTexto.addEventListener(
      "keydown",
      (event) => {
        var keyValue = event.key;

        if (keyValue == "Escape") {
          this._close(evt);

          if (imagenEditar) {
            imagenEditar.addEventListener("click", procesaClickEditarPerfil);
          }
        }
      },
      false
    );

    this._fondo.addEventListener("click", (evt) => {
      const elemento = evt.target.classList[0];
      if (elemento === "modal-form") {
        this._close(evt);
      }
    });
  }

  _getInputValuesEP() {
    this._nuevoNombre = this._inputNombre.value;
    this._nuevoAbout = this._inputAcerca.value;
  }
  _getInputValuesNP() {
    this._inputTitle = this._form.querySelector("#np-title");
    this._inputLink = this._form.querySelector("#np-image");
    this._nuevoTitulo = this._inputTitle.value;
    this._nuevoLink = this._inputLink.value;
  }
}
