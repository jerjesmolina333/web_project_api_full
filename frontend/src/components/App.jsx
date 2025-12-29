import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import Signin from "./Signin/Signin.jsx";
import Signup from "./Signup/Signup.jsx";
import * as auth from "../utils/auth.js";
import Api from "../utils/Api.js";
import { setToken, getToken, removeToken } from "../utils/token.js";

function App() {
  const [userData, setUserData] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [popup, setPopup] = useState(null);
  const navigate = useNavigate();

  const handleUpdateUser = (data) => {
    const jwt = getToken();
    const params = {
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    };

    const api = new Api(
      {
        linkUser: import.meta.env.VITE_API_USER_URL,
        linkImags: import.meta.env.VITE_API_CARDS_URL,
      },
      params
    );

    (async () => {
      await api._actualizaUsuario(data).then((newData) => {
        setUserData(newData);
      });
    })();
  };
  function abreRegExitoso() {
    handleOpenPopup({
      children: <RegisterOK handleClosePopup={handleClosePopup} />,
    });
  }
  function abreMensajeError() {
    setPopup(null);
    try {
      handleOpenPopup({
        children: <MensajeNoOK handleClosePopup={handleClosePopup} />,
      });
    } catch (error) {
      console.error("❌ Error en abreMensajeError:", error);
    }
  }

  const handleUpdateAvatar = (data) => {
    const jwt = getToken();
    const params = {
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    };

    const api = new Api(
      {
        linkUser: import.meta.env.VITE_API_USER_URL,
        linkImags: import.meta.env.VITE_API_CARDS_URL,
      },
      params
    );

    (async () => {
      await api._actualizaAvatar(data).then((newData) => {
        setUserData(newData);
      });
    })();
  };

  function handleClosePopup() {
    setPopup(null);
  }

  const handleRegistration = ({ name, password, email, about, avatar }) => {
    try {
      auth.signup(name, password, email, about, avatar).then(() => {
        // Aquí abrir la ventana de éxito en el registro
        abreRegExitoso();
        // Esperar 2 segundos antes de navegar para que el usuario vea el popup
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      });
    } catch (err) {
      abreMensajeError();
      console.error(err);
    }
  };

  const handleLogin = async ({ email, password }) => {
    if (!email || !password) {
      return;
    }

    try {
      // console.log(
      //   "🔵 App.jsx - Calling signin with abreMensajeError:",
      //   typeof abreMensajeError
      // );
      const data = await auth.signin({ email, password, abreMensajeError });
      const res = await auth.validaToken(data.token);
      // Guarda el token en el almacenamiento local:
      setToken(data.token);
      setUserData(res.data);
      setIsLoggedIn(true);
      navigate("/");
    } catch (err) {
      console.error("❌ App.jsx - Error en handleLogin:", err);
      abreMensajeError();
    }
  };

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleLogout() {
    removeToken();
    setIsLoggedIn(false);
    setUserData("");
    navigate("/signin");
  }

  useEffect(() => {
    const jwt = getToken();
    // console.log("INICIO. useEffect");
    if (!jwt) {
      console.log("No hay token");
      setUserData({});
      setIsCheckingAuth(false);
      return;
    }
    auth
      .getUserInfo(jwt)
      .then((res) => {
        // Manejar si los datos vienen en res.data o directamente en res
        const userData = res.data || res;

        setUserData(userData);
        setIsLoggedIn(true);
        setIsCheckingAuth(false);
      })
      .catch((err) => {
        console.error("Error al validar token:", err);
        setIsLoggedIn(false);
        setIsCheckingAuth(false);
      });
  }, []);

  return (
    <>
      {isCheckingAuth ? (
        <div className="page">Verificando autenticación...</div>
      ) : (
        <div className="page">
          <Header
            isLoggedIn={isLoggedIn}
            userData={userData}
            handleLogout={handleLogout}
          />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Main
                    userData={userData}
                    handleUpdateUser={handleUpdateUser}
                    handleUpdateAvatar={handleUpdateAvatar}
                    handleClosePopup={handleClosePopup}
                    handleOpenPopup={handleOpenPopup}
                    popup={popup}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/signin"
              element={
                isLoggedIn ? (
                  <Navigate to="/" replace />
                ) : (
                  <Signin
                    handleLogin={handleLogin}
                    handleClosePopup={handleClosePopup}
                  />
                )
              }
            />
            <Route
              path="/signup"
              element={
                isLoggedIn ? (
                  <Navigate to="/" replace />
                ) : (
                  <Signup
                    handleRegistration={handleRegistration}
                    handleOpenPopup={handleOpenPopup}
                  />
                )
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
