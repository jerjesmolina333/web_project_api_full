import React from "react";
import { useState } from "react";

export default function EditProfile(props) {
  // console.log("🔵 EditProfile.jsx - props:", props);
  // console.log("🔵 EditProfile.jsx - currentUser:", props.currentUser);

  const currentUser = props.currentUser || {};

  const [name, setName] = useState(currentUser.name || "");
  const [about, setAbout] = useState(currentUser.about || "");

  const handleNameChange = (evt) => {
    setName(evt.target.value); // Actualiza name cuando cambie la entrada
  };

  const handleAboutChange = (evt) => {
    setAbout(evt.target.value);
  };

  const handleSubmit = (event) => {
    console.log("🔵 EditProfile.jsx - handleSubmit - name:", name);
    console.log("🔵 EditProfile.jsx - handleSubmit - about:", about);
    event.preventDefault();
    props.handleUpdateUser({ name, about }); // Actualiza la información del usuario
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
          id="about"
          placeholder={currentUser?.about}
          onChange={handleAboutChange}
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
