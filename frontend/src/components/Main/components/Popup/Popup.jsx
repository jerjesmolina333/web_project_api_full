import btnCerrar from "../../../../../images/BotonCerrar.png";

export default function Popup(props) {
  const { onClose, title, children } = props;

  function cierraVentanaBoton() {
    console.log("Cerrando ventana emergente");
    if (onClose) {
      onClose();
    }
  }

  return (
    <>
      <div className="modal-overlay">
        <div className="popup__container">
          <img
            className="popup__cerrar-overlay"
            src={btnCerrar}
            alt="Imagen botón cerrar"
            onClick={() => cierraVentanaBoton()}
          />
          {title && <p className="popup__heading">{title}</p>}
          {children}
        </div>
      </div>
    </>
  );
}
