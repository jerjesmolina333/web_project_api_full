import { useState } from "react";

export default function NewCard(props) {
  const [name, setName] = useState(""); // Agrega la variable de estado para name
  const [link, setLink] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault(); // Evita el comportamiento predeterminado del envío de formularios
    props.handleAddPlaceSubmit({
      name,
      link,
    });
    props.handleClosePopup();
  };

  const handleNameChange = (evt) => {
    setName(evt.target.value);
  };
  const handleLinkChange = (evt) => {
    setLink(evt.target.value);
  };

  return (
    <>
      <form
        className="popup__form"
        name="card-form"
        id="nuevo-lugar"
        method="post"
        onSubmit={handleSubmit}
        noValidate
      >
        <label className="popup__field">
          <input
            type="text"
            className="popup__input"
            id="np-title"
            placeholder="Título"
            minLength="2"
            maxLength="30"
            onChange={handleNameChange}
            required
          />
          <span className="popup__input_type_error np-title-error"></span>
        </label>
        <label className="popup__field">
          <input
            type="url"
            className="popup__input popup__input_type_url"
            id="card-link"
            name="link"
            minLength="2"
            maxLength="200"
            placeholder="Enlace a la imagen"
            onChange={handleLinkChange}
            required
          />
          <span
            className="popup__input_type_error np-image-error"
            id="card-link-error"
          ></span>
        </label>

        <button className="popup__button form__submit_inactive" type="submit">
          Crear
        </button>
      </form>
    </>
  );
}
