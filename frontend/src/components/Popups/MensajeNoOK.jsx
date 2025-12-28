import imgNoOK from "../../../images/imgNoOK.png";
import btnCerrar from "../../../images/BotonCerrar.png";

const MensajeNoOK = (props) => {
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
        <img className="popup__img" src={imgNoOK} alt="Imagen No OK" />
      </div>
      <div className="popup__message">
        <p>Huy, algo salió mal. Por favor, inténtalo de nuevo.</p>
      </div>
    </div>
  );
};

export default MensajeNoOK;
