import { PopupWithForm } from "./PopupWithForm.js";
import {
  paramsValidationEP,
  paramsValidationNP,
  paramsValidationEdImg,
} from "../src/utils/constants.js";
import { FormValidator } from "./FormValidator.js";
// import { Api } from "../src/utils/Api.js";
import api from "../src/utils/Api.js";

function attendSubmitProfile(evt) {
  evt.preventDefault();
  const nombre = contEP.querySelector("#nombre");
  const profesion = formaEdicion.querySelector("#acerca");
  const nombrePerfil = document.querySelector(".profile__name");
  const profesionPerfil = document.querySelector(".profile__profession");

  nombrePerfil.textContent = nombre.value;
  profesionPerfil.textContent = profesion.value;

  contEP.style.display = "none";
  document.body.classList.remove("modal-open");
}

function attendLike(evt) {
  const element = evt.target;
  const padre1 = element.parentElement;
  const padre2 = padre1.parentElement;
  const id_imagen = padre2.querySelector(".img-id").textContent;
  const tempOrden = `https://around-api.es.tripleten-services.com/v1/cards/${id_imagen}/likes`;

  fetch(tempOrden, {
    method: "PUT",
    headers: {
      authorization: "a75089ec-acc5-4d18-8c11-de5f96ae144f",
    },
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log("== Exito dando like. data: " + data);
    })
    .catch(function (error) {
      console.log(error);
      return Promise.reject(`Error: ${res.status}`);
    });
}

function attendNoLike(evt) {
  const element = evt.target;
  const padre1 = element.parentElement;
  const padre2 = padre1.parentElement;
  const id_imagen = padre2.querySelector(".img-id").textContent;
  const tempOrden = `https://around-api.es.tripleten-services.com/v1/cards/${id_imagen}/likes`;

  fetch(tempOrden, {
    method: "DELETE",
    headers: {
      authorization: "a75089ec-acc5-4d18-8c11-de5f96ae144f",
    },
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log("== Exito dando NO like. data: " + data);
    })
    .catch(function (error) {
      console.log(error);
      return Promise.reject(`Error: ${res.status}`);
    });
}

export function agregaEventosBotonLike() {
  document.querySelectorAll(".element__like").forEach(function (img) {
    img.addEventListener("mouseenter", function (evt) {
      const element = evt.target;
      const padre1 = element.parentElement;
      const elementLike = padre1.querySelector(".element__liked");
      const thisLiked = elementLike.textContent;
      if (thisLiked === "Liked") {
        img.src = "../images/Like.png";
      } else {
        img.src = "../images/Like2.png";
      }
    });

    img.addEventListener("mouseleave", function (evt) {
      const element = evt.target;
      const padre1 = element.parentElement;
      const elementLike = padre1.querySelector(".element__liked");
      const thisLiked = elementLike.textContent;
      if (thisLiked === "Liked") {
        img.src = "../images/Like2.png";
      } else {
        img.src = "../images/Like.png";
      }
    });

    img.addEventListener("click", function (evt) {
      const element = evt.target;
      const padre1 = element.parentElement;
      const elementLike = padre1.querySelector(".element__liked");
      const thisLiked = elementLike.textContent;
      if (thisLiked === "Liked") {
        img.src = "../images/Like.png";
        elementLike.textContent = "No-Liked";
        attendNoLike(evt);
      } else {
        img.src = "../images/Like2.png";
        elementLike.textContent = "Liked";
        attendLike(evt);
      }
    });
  });
}

export function procesaClickEliminarImagen(evt, img_id, contenedorImagen) {
  const marcadoFormElImg = `
  <div class="popup__container" id="container-ElImg">
     <img
      src="../images/BotonCerrar.png"
      class="popup__cerrar"
      alt="cerrar ventana"
    />
    <h2 class="popup__ElImgHeading">Estás seguro/a?</h2>
    <h2 class="img-id">${img_id}</h2>
    <form class="popup__formEI" id="eliminar-imagen" method="post">
      <fieldset class="form__set">
        <button type="submit" class="popup__button form__submit_inactive">
          Sí
        </button>
      </fieldset>
    </form>
  </div>
  `;
  const formaEI = new PopupWithForm(
    {
      popupSelector: "#modal-form",
      fondoSelector: "#modal-form",
      templateSelector: "#formGEN",
      containerSelector: ".popup__containerGEN",
      formSelector: ".popup__formEI",
      primerCampoTexto: ".popup__button",
    },
    marcadoFormElImg,
    contenedorImagen
  );

  formaEI.open(evt);
  formaEI._setEventListeners();
}

export function procesaClikEditarAvatar(evt) {
  const marcadoFormEdImg = `
      <div classclass="popup__container" id="container-EdImg">
        <img
          src="../images/BotonCerrar.png"
          class="popup__cerrar"
          alt="cerrar ventana"
        />
        <form class="popup__formEdImg" id="editar-avatar" method="post">
          <h2 class="popup__heading">Cambiar foto de perfil</h2>
          <fieldset class="form__set">
            <input
              type="text"
              class="popup__input"
              id="link"
              placeholder="Liga a la foto"
              minlength="2"
              maxlength="200"
              required
            />
            <span class="popup__input_type_error link-error"></span>
            <button type="submit" class="popup__button form__submit_inactive">
              Guardar
            </button>
          </fieldset>
        </form>
      </div>
  `;
  const formEdImg = new PopupWithForm(
    {
      popupSelector: "#modal-form",
      fondoSelector: "#modal-form",
      templateSelector: "#formGEN",
      containerSelector: ".popup__containerGEN",
      formSelector: ".popup__formEdImg",
      primerCampoTexto: "#link",
    },
    marcadoFormEdImg
  );
  formEdImg.open(evt);
  const validatorEdImg = new FormValidator(
    paramsValidationEdImg,
    ".popup__input"
  );
  validatorEdImg.enableValidation();
}

export function procesaClickEditarPerfil(evt) {
  const marcadoFormEP = `
      <div class="popup__container popup__container_EP" id="container-EP"> 
        <img
          src="../images/BotonCerrar.png"
          class="popup__cerrar"
          alt="cerrar ventana"
        />

        <form class="popup__formEP" id="editar-perfil" method="post">
          <h2 class="popup__heading">Editar perfil</h2>
          <fieldset class="form__set">
            <input
              type="text"
              class="popup__input"
              id="nombre"
              placeholder="Nombre"
              minlength="2"
              maxlength="40"
              required
            />
            <span class="popup__input_type_error nombre-error"></span>
            <input
              type="text"
              class="popup__input"
              id="acerca"
              placeholder="Acerca de mí"
              minlength="2"
              maxlength="200"
              required
            />
            <span class="popup__input_type_error acerca-error"></span>
            <button type="submit" class="popup__button form__submit_inactive">
              Guardar
            </button>
          </fieldset>
        </form>
      </div>
`;
  const formaEP2 = new PopupWithForm(
    {
      popupSelector: "#modal-form",
      fondoSelector: "#modal-form",
      templateSelector: "#formGEN",
      containerSelector: ".popup__containerGEN",
      formSelector: ".popup__formEP",
      primerCampoTexto: "#nombre",
    },
    marcadoFormEP
  );
  formaEP2.open(evt);
  formaEP2.setTextEP();
  const validatorEP = new FormValidator(paramsValidationEP, ".popup__input");
  validatorEP.enableValidation();
}

export function procesaClickNewPlace(evt) {
  const marcadoFormNP = `
  <div class="popup__container popup__container_NP" id="container-NP"> 
       <img
          src="../images/BotonCerrar.png"
          class="popup__cerrar"
          alt="cerrar ventana"
        />
        <form class="popup__formNP" id="nuevo-lugar" method="post">
          <h2 class="popup__heading">Nuevo Lugar</h2>
          <fieldset class="form__set">
            <input
              type="text"
              class="popup__input"
              id="np-title"
              placeholder="Título"
              minlength="2"
              maxlength="30"
              required
            />
            <span class="popup__input_type_error np-title-error"></span>
            <input
              type="url"
              class="popup__input"
              id="np-image"
              placeholder="Enlace a la imagen"
              required
            />
            <span class="popup__input_type_error np-image-error"></span>
            <button type="submit" class="popup__button form__submit_inactive">
              Crear
            </button>
          </fieldset>
        </form>
      </div>
`;

  const formaNP = new PopupWithForm(
    {
      popupSelector: "#modal-form",
      fondoSelector: "#modal-form",
      templateSelector: "#formGEN",
      containerSelector: ".popup__containerGEN",
      formSelector: ".popup__formNP",
      primerCampoTexto: "#np-title",
    },
    marcadoFormNP
  );

  formaNP.open(evt);

  const validatorNP = new FormValidator(paramsValidationNP, ".popup__input");
  validatorNP.enableValidation();
}

export function procesaMouseEnterBotPlus(botonPlus, imagenBotonPlus) {
  botonPlus.classList.add("profile__boton-plus_solid");
  imagenBotonPlus.src = "./images/AddButton2.png";
}

export function procesaMouseleaveBotPlus(botonPlus, imagenBotonPlus) {
  botonPlus.classList.remove("profile__boton-plus_solid");
  botonPlus.classList.add("profile__plus-container");
  imagenBotonPlus.src = "./images/AddButton.png";
}
export function agregaPropsImg(evt, img, imagenDesplegada) {
  img.addEventListener("click", function (evt) {
    const posXClick = "" + evt.clientX + "px";
    const posYClick = "" + (evt.clientY + 100) + "px";

    if (!imagenDesplegada) {
      const url = img.src;

      const modalDisplay = document.querySelector(".imagen__display");
      modalDisplay.style.display = "flex";
      document.body.classList.add("modal-open");

      const imagenTemplate = document.querySelector("#imagen").content;
      const imagenContainer = imagenTemplate
        .querySelector(".imagen__container")
        .cloneNode(true);

      imagenContainer.querySelector(".imagen__pic").src = url;
      imagenContainer.style.top = posYClick;
      imagenContainer.style.left = "250px";

      modalDisplay.append(imagenContainer);

      imagenDesplegada = true;

      imagenContainer
        .querySelector(".popup__cerrarIMG")
        .addEventListener("click", function (evt) {
          const elem = evt.target;
          const padre1 = elem.parentElement;
          const padre2 = padre1.parentElement;
          padre1.remove();
          padre2.style.display = "none";
          imagenDesplegada = false;
          return;
        });

      const fondoPage = document.querySelector(".popup");
      fondoPage.addEventListener("click", (evt) => {
        const elemento = evt.target.classList[0];
        // console.log("elemento: " + elemento);
        if (elemento === "popup") {
          const elem = evt.target;
          const padre1 = elem.parentElement;
          const imagenContainer = document.querySelector(".imagen__container");
          imagenContainer.remove();
          padre1.style.display = "none";
          imagenDesplegada = false;
          return;
        }
      });
    }
  });
}
