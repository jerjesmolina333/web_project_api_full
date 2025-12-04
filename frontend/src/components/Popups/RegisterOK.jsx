import React from "react";
import btnCerrar from "../../../images//BotonCerrar.png";
import btnOK from "../../../images/BotonOK.png";

export default function RegisterOK(props) {
  console.log("======= ESTOY EN RegisterOK ========");
  alert("Estoy en RegisterOK");
  function cierraVentanaBoton() {
    props.handleClosePopup();
  }

  return (
    <div className="modal__message">
      <img
        className="popup__cerrar"
        src={btnCerrar}
        alt="Imagen botón cerrar"
        // onClick={() => cierraVentanaBoton()}
      />
      <div>
        <img className="popup__img" src={btnOK} alt="Imagen OK" />
      </div>
      <div className="popup__heading">
        <h3>¡Correcto! Ya estás registrado</h3>
      </div>
    </div>
  );
}
