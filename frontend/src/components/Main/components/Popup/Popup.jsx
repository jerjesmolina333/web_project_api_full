import btnCerrar from "../../../../../images/BotonCerrar.png";

export default function Popup(props) {
  // se ha desestructurado onClose de props
  //los hijos son el contenido de la ventana emergente
  const { onClose, title, children } = props;

  function cierraVentanaBoton() {
    props.onClose();
  }

  return (
    <>
      <div className="modal-overlay">
        <div className="popup__container">
          <img
            className="popup__cerrar"
            src={btnCerrar}
            alt="Imagen botón cerrar"
            onClick={() => cierraVentanaBoton()}
          />
          <div className={`${title ? "popup__heading" : ""}`}>
            <h3>{title}</h3>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
