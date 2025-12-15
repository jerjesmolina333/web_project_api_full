import React from "react";

import { useState, useContext } from "react";
import api from "../../../../../utils/Api";
import { CurrentUserContext } from "../../../../../contexts/CurrentUserContext";

export default function EditProfile(props) {
  const userContext = useContext(CurrentUserContext); // Suscribirse a CurrentUserContext
  const currentUser = useContext(CurrentUserContext); // Obtiene el objeto currentUser

  // const { handleUpdateUser } = userContext;

  const [name, setName] = useState(currentUser.name); // Agrega la variable de estado para name
  const [description, setDescription] = useState(currentUser.about); // Agrega la variable de estado para description

  const handleNameChange = (evt) => {
    setName(evt.target.value); // Actualiza name cuando cambie la entrada
  };

  const handleDescriptionChange = (evt) => {
    setDescription(evt.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del envío de formularios
    props.handleUpdateUser({ name, about: description }); // Actualiza la información del usuario // Actualiza la información del usuario
    props.handleClosePopup();
  };

  return (
    <form
      className="popup__form"
      name="EP-form"
      id="editar-perfil"
      method="post"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          type="text"
          className="popup__input popup__input_type_card-name"
          maxLength="40"
          minLength="2"
          id="nombre"
          placeholder={currentUser?.name}
          onChange={handleNameChange}
          required
        />
        <span className="popup__input_type_error nombre-error"></span>
      </label>
      <label className="popup__field">
        <input
          className="popup__input"
          type="text"
          id="acerca"
          placeholder={currentUser?.about}
          onChange={handleDescriptionChange}
          minLength="2"
          maxLength="200"
          required
        />
        <span
          className="popup__input_type_error acerca-error"
          id="card-link-error"
        ></span>
      </label>

      <button className="popup__button popup__button_disabled" type="submit">
        Guardar
      </button>
    </form>
  );
}
