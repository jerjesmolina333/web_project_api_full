import logoPng from "../../../images/logo.png";

function Header(props) {
  {
    console.log("HEADER props.userData:", props.userData);
    console.log("user name:", props.userData?.name);
    console;
  }
  return (
    <header className="header">
      <img src={logoPng} className="logo header__logo" alt="Logo" />
      <div className="header__message">
        {props.isLoggedIn && (
          <>
            <p>
              {props.userData?.email || props.userData}
              <button
                onClick={props.handleLogout}
                className="header__link"
                // style={{
                //   marginLeft: "20px",
                //   padding: "5px 15px",
                //   cursor: "pointer",
                //   backgroundColor: "#2f80ed",
                //   color: "white",
                //   border: "none",
                //   borderRadius: "4px",
                // }}
              >
                Cerrar Sesión
              </button>
            </p>
          </>
        )}
      </div>
      <div className="header__line"></div>
    </header>
  );
}

export default Header;
