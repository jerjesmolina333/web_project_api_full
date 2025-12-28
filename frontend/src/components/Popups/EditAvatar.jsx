import React from "react";

export default function EditAvatar() {
  const handleAvatarChange = (evt) => {
    setAvatar(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
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
