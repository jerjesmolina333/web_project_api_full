import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import logoPng from "../../../images/Logo.png";
import { useContext } from "react";
import RegisterOK from "../Popups/RegisterOK.jsx";
import BotonOK from "../../../images/BotonOK.png";

const Header = (props) => {
  // const currentUser = useContext(CurrentUserContext); // Obtiene el objeto currentUser
  const abrePopupOK = {
    title: "Editar avatar",
    children: <RegisterOK />,
  };

  return (
    <div className="header">
      <img src={logoPng} className="logo header__logo" alt="Logo" />
      <div className="header__message">
        <p>
          {/* {props.userData} */}
          {props.isLoggedIn ? props.userData + "   Cerrar Sesión" : ""}
        </p>
        {/* <img src={BotonOK} onClick={() => props.handleOpenPopup(abrePopupOK)} /> */}
      </div>
    </div>
  );
};

export default Header;
