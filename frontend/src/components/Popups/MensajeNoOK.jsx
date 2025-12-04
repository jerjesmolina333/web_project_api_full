import { useState } from "react";
import btnCerrar from "../../../images//BotonCerrar.png";
import btnNoOK from "../../../images/BotonNoOK.png";

const MensajeNoOK = (props) => {
  function cierraVentanaBoton() {
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
        <img className="popup__img" src={btnNoOK} alt="Imagen No OK" />
      </div>
      <div className="popup__heading">
        <h3>Huy, algo salió mal. Por favor, inténtalo de nuevo</h3>
      </div>
    </div>
  );
};

export default MensajeNoOK;
