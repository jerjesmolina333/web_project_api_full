import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import btnCerrar from "../../../images//BotonCerrar.png";

const Signup = ({ handleRegistration, handleOpenPopup }) => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  // Función de gestión de envíos.
  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div className="page">
      <div className="modal-overlay">
        <img
          className="popup__cerrar"
          src={btnCerrar}
          alt="Imagen botón cerrar"
          onClick={() => navigate("/")}
        />
        <div className="popup__heading">
          <h3>Regístrate</h3>
        </div>
        <form
          className="popup__form"
          name="signup-form"
          id="alta-usuario"
          method="post"
          noValidate
          onSubmit={handleSubmit}
        >
          <label className="popup__field">
            <input
              type="text"
              className="popup__input popup__input_type_name"
              maxLength="40"
              minLength="2"
              id="name"
              name="name"
              placeholder="Nombre"
              onChange={handleChange}
              required
            />
            <span className="popup__input_type_error name-error"></span>
          </label>
          <label className="popup__field">
            <input
              className="popup__input"
              type="password"
              id="password"
              name="password"
              placeholder="Contraseña"
              onChange={handleChange}
              minLength="4"
              maxLength="10"
              required
            />
            <span
              className="popup__input_type_error acerca-error"
              id="password-error"
            ></span>
          </label>
          <label className="popup__field">
            <input
              type="text"
              className="popup__input popup__input_type_email"
              maxLength="40"
              minLength="2"
              id="email"
              name="email"
              placeholder="Correo electrónico"
              onChange={handleChange}
              required
            />
            <span className="popup__input_type_error email-error"></span>
          </label>
          <label className="popup__field">
            <input
              type="text"
              className="popup__input popup__input_type_acerca"
              maxLength="40"
              minLength="4"
              id="about"
              name="about"
              placeholder="Ocupación"
              onChange={handleChange}
              required
            />
            <span className="popup__input_type_error about-error"></span>
          </label>

          <label className="popup__field">
            <input
              type="text"
              className="popup__input popup__input_type_avatar"
              maxLength="80"
              minLength="4"
              id="avatar"
              name="avatar"
              placeholder="Foto"
              onChange={handleChange}
              required
            />
            <span className="popup__input_type_error avatar-error"></span>
          </label>

          <button
            className="popup__button popup__button_disabled"
            type="submit"
          >
            Regístrate
          </button>
        </form>
        <div className="popup__message">
          <p>
            ¿Ya eres miembro?
            <button
              className="main__enlace"
              onClick={() => {
                navigate("/signin");
              }}
            >
              Inicia sesión aquí
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
