import React from "react";
import { useState, useContext, useRef } from "react";
import { CurrentUserContext } from "../../../../../contexts/CurrentUserContext";

export default function EditAvatar(props) {
  // suscribirse a CurrentUserContext
  const currentUser = useContext(CurrentUserContext);
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const avatarRef = React.useRef(avatar);

  const handleAvatarChange = (evt) => {
    setAvatar(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault(); // Evita el comportamiento predeterminado del envío de formularios
    props.handleUpdateAvatar({
      // Actualiza la información del usuario
      avatar: avatarRef.current.value,
    });
    props.handleClosePopup();
  };

  return (
    <form
      name="EA-form"
      id="editar-avatar"
      method="post"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          type="text"
          className="popup__input"
          maxLength="200"
          minLength="2"
          id="link"
          ref={avatarRef}
          placeholder={currentUser?.avatar}
          onChange={handleAvatarChange}
          required
        />
        <span className="popup__input_type_error "></span>
      </label>

      <button className="popup__button popup__button_disabled" type="submit">
        Guardar
      </button>
    </form>
  );
}
