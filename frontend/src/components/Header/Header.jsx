import logoPng from "../../../images/logo.png";

function Header() {
  return (
    <header className="header">
      <img src={logoPng} className="logo header__logo" alt="Logo" />
      <div className="header__line"></div>
    </header>
  );
}

export default Header;
