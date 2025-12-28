import React from "react";
import imgOK from "../../../images/imgOK.png";
import btnCerrar from "../../../images/BotonCerrar.png";

export default function RegisterOK(props) {
  function cierraVentanaBoton() {
    alert("Cerrando ventana emergente");
    props.handleClosePopup();
  }
  return (
    <div className="modal__message">
      <img
        className="popup__cerrar"
        src={btnCerrar}
        alt="Imagen botón cerrar"
        onClick={() => cierraVentanaBoton()}
      />
      <div>
        <img className="popup__img" src={imgOK} alt="Imagen OK" />
      </div>
      <div className="popup__message">
        <h3>¡Correcto! Ya estás registrado</h3>
      </div>
    </div>
  );
}
