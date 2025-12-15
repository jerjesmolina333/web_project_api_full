import { useState } from "react";
import Header from "../src/components/Header/Header.jsx";
import Main from "../src/components/Main/Main.jsx";
import Footer from "../src/components/Footer/Footer.jsx";
import api from "../src/utils/Api.js";
import Signin from "../src/components/Signin/Signin.jsx";
import Signup from "../src/components/Signup/Signup.jsx";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import ProtectedRoute from "../src/components/ProtectedRoute/ProtectedRoute.jsx";
import { setToken } from "./utils/token.js";
import * as auth from "../src/utils/auth.js";
import Api from "../src/utils/Api.js";
import EditAvatar from "../src/components/Popups/EditAvatar.jsx";

function App() {
  const [userData, setUserData] = useState({ email: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [popup, setPopup] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const params = {
    headers: {
      authorization: import.meta.env.VITE_AUTH_TOKEN,
    },
  };

  const api = new Api(
    {
      linkUser: import.meta.env.VITE_API_USER_URL,
      linkImags: import.meta.env.VITE_API_CARDS_URL,
    },
    params
  );

  const handleUpdateUser = (data) => {
    (async () => {
      await api._actualizaUsuario(data).then((newData) => {
        setCurrentUser(newData);
      });
    })();
  };
  const handleUpdateAvatar = (data) => {
    (async () => {
      await api._actualizaAvatar(data).then((newData) => {
        setCurrentUser(newData);
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

            setUserData(res.data.email);
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

  // useEffect(() => {
  //   const jwt = getToken();
  //   console.log("INICIO. useEffect");
  //   if (!jwt) {
  //     navigate("/signup");
  //     return;
  //   }

  //   auth
  //     .getUserInfo(jwt)
  //     .then((res) => {
  //       // si la respuesta es exitosa, inicia la sesión del usuario, guarda sus
  //       // datos en el estado y lo dirige a /.
  //       setIsLoggedIn(true);
  //       setUserData(res.data.email);
  //       navigate("/");
  //     })
  //     .catch(console.error);
  // }, [navigate, isLoggedIn]);

  return (
    <>
      <div className="page">
        <Header
          isLoggedIn={isLoggedIn}
          userData={userData}
          handleOpenPopup={handleOpenPopup}
          handleClosePopup={handleClosePopup}
        />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Main
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
            element={<Signin handleLogin={handleLogin} />}
          />
          <Route
            path="/signup"
            element={<Signup handleRegistration={handleRegistration} />}
          />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
