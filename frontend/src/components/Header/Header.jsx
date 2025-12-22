import logoPng from "../../../images/logo.png";

function Header(props) {
  {
  }
  return (
    <header className="header">
      <img src={logoPng} className="logo header__logo" alt="Logo" />
      <p className="header__message">email: {props.userData}</p>
      <div className="header__message">
        <p>{props.isLoggedIn ? props.userData + "   Cerrar Sesión" : ""}</p>
      </div>
      <div className="header__line"></div>
    </header>
  );
}

export default Header;
