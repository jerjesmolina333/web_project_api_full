import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import Header from "../components/Header/Header.jsx";
import Main from "../components/Main/Main.jsx";
import Footer from "../components/Footer/Footer.jsx";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute.jsx";
import Signin from "../components/Signin/Signin.jsx";
import Signup from "../components/Signup/Signup.jsx";
import * as auth from "../utils/auth";
import Api from "../utils/Api.js";
import { setToken, getToken, removeToken } from "../utils/token.js";
// import Popup from "../components/Popup.jsx";

import EditAvatar from "./Popups/EditAvatar.jsx";

function App() {
  const [userData, setUserData] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [popup, setPopup] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

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

  function handleClosePopup(popup) {
    setPopup(null);
  }

  const handleRegistration = ({ name, password, email, about, avatar }) => {
    try {
      auth.signup(name, password, email, about, avatar).then(() => {
        navigate("/signin");
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }

    try {
      auth.signin(email, password).then((data) => {
        try {
          auth.validaToken(data.token).then((res) => {
            // Guarda el token en el almacenamiento local:
            setToken(data.token);
            // console.log("token guardado:", data.token);
            // console.log("datos del usuario:", res.data);
            // console.log("data.name: ", res.data.name);
            // console.log("data.email: ", res.data.email);
            // console.log("data.avatar: ", res.data.avatar);
            setUserData(res.data);
            setIsLoggedIn(true);
            navigate("/");
          });
        } catch (error) {
          console.error(error);
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  const editAvatarPopup = {
    title: "Editar avatar",
    children: <EditAvatar />,
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
        // console.log(">>>>>Token válido, iniciando sesión del usuario");
        // console.log(">>>>>Datos del usuario completos:", res);
        // console.log(">>>>>Estructura res.data:", res.data);

        // Manejar si los datos vienen en res.data o directamente en res
        const userData = res.data || res;

        // console.log(">>>>>Nombre del usuario:", userData.name);
        // console.log(">>>>>Email del usuario:", userData.email);
        // console.log(">>>>>Avatar del usuario:", userData.avatar);

        setUserData(userData);
        setIsLoggedIn(true);
        setIsCheckingAuth(false);
        // console.log(">>>>>>Usuario autenticado");
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
                  <Signin handleLogin={handleLogin} />
                )
              }
            />
            <Route
              path="/signup"
              element={
                isLoggedIn ? (
                  <Navigate to="/" replace />
                ) : (
                  <Signup handleRegistration={handleRegistration} />
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
