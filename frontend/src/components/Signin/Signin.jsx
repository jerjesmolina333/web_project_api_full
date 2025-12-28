import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import btnCerrar from "../../../images/BotonCerrar.png";

const Signin = ({ handleLogin }) => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // handleSubmit evita el comportamiento del navegador por defecto y llama
  // al controlador de inicio de sesión.
  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLogin(data);
  };

  return (
    <div className="page">
      <div className="modal-overlay">
        <img
          className="popup__cerrar-overlay"
          src={btnCerrar}
          alt="Imagen botón cerrar"
          // onClick={() => cierraVentanaBoton()}
        />
        <div className="popup__heading">
          <h3>Inicia sesión</h3>
        </div>
        <form
          className="popup__form"
          name="signin-form"
          id="validacion-usuario"
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

          <button
            className="popup__button popup__button_disabled"
            type="submit"
          >
            Inicia sesión
          </button>
        </form>
        <div className="popup__message">
          <p>
            ¿Aún no eres miembro?
            <button
              className="main__enlace"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Regístrate aquí
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
