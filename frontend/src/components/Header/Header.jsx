import logoPng from "../../../images/logo.png";

function Header(props) {
  return (
    <header className="header">
      <img src={logoPng} className="logo header__logo" alt="Logo" />
      <div className="header__message">
        {props.isLoggedIn && (
          <>
            <div className="header__info">
              {/* {props.userData?.email || props.userData} */}
              {props.userData?.email || ""}
              <p onClick={props.handleLogout} className="header__link">
                Cerrar Sesión
              </p>
            </div>
          </>
        )}
      </div>
      <div className="header__line"></div>
    </header>
  );
}

export default Header;
