import { useState, useContext, useEffect } from "react";
import Popup from "../Main/components/Popup/Popup";
import EditAvatar from "../Main/components/Popup/EditAvatar/EditAvatar";
import EditProfile from "./components/Popup/EditProfile/EditProfile";
import Card from "../Main/components/Card/Card";
import NewCard from "./components/Popup/NewCard/NewCard";
import Api from "../../utils/Api";
import { getToken } from "../../utils/token";
import addButton from "../../../images/AddButton.png";
import edAvatar from "../../../images/Icono_ed_avatar.png";
import edButton from "../../../images/EditButton.png";

import {
  CurrentUserContext,
  currentUser,
} from "../../../src/contexts/CurrentUserContext";

import imgEdAvatar from "../../../images/Icono_ed_avatar.png";
import imgAddButton from "../../../images/AddButton.png";
import imgEdButton from "../../../images/EditButton.png";

export default function Main(props) {
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);

  // Usar los datos del usuario que vienen de App.jsx
  const currentUser = props.userData || {};

  const jwt = getToken();
  console.log("🔵 Main.jsx - JWT Token:", jwt);
  console.log("🔵 Main.jsx - userData from props:", props.userData);
  const params = {
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  };

  const api = new Api(
    {
      linkUser: "https://jerjesm.online/users/me",
      linkImags: "https://jerjesm.online/cards/",
    },
    params
  );

  // useEffect(() => {
  //   async function updateUser() {
  //     try {
  //       console.log("^^^^Fetching user info...");
  //       const updatedUser = await api.getInfoUser();
  //       console.log("^^^^User info fetched:", updatedUser);
  //       setCurrentUser(updatedUser);
  //     } catch (error) {
  //       console.error("❌ Error fetching user info:", error);
  //     }
  //   }
  //   updateUser();
  // }, []);

  useEffect(() => {
    async function getCards() {
      const cardsList = await api.getImagesList();
      setCards(cardsList);
    }
    getCards();
  }, []);

  async function onCardDelete(cID) {
    await api
      .handleCardDelete(cID)
      .then(() => {
        setCards(cards.filter((card) => card._id !== cID));
      })
      .catch((error) => console.error(error));
  }

  const editProfilePopup = {
    title: "Editar perfil",
    children: (
      <EditProfile
        handleUpdateUser={props.handleUpdateUser}
        handleClosePopup={props.onClosePopup}
      />
    ),
  };

  const handleAddPlaceSubmit = (data) => {
    (async () => {
      await api.insertaImagen(data).then((newData) => {
        const nuevosDatos = [newData, ...cards];
        setCards(nuevosDatos);
      });
    })();
  };

  const newCardPopup = {
    title: "Nuevo lugar",
    children: (
      <NewCard
        handleClosePopup={props.onClosePopup}
        handleAddPlaceSubmit={handleAddPlaceSubmit}
      />
    ),
  };

  const editAvatarPopup = {
    title: "Editar avatar",
    children: (
      <EditAvatar
        handleUpdateAvatar={props.handleUpdateAvatar}
        handleClosePopup={props.onClosePopup}
      />
    ),
  };

  return (
    <>
      {console.log(">>>>>>>>Renderizando Main...")}
      {console.log("User Data from props:", props.userData)}
      {console.log("User avatar from props:", props.userData?.avatar)}
      {console.log("User name from props:", props.userData?.name)}
      {/* {console.log("Current User:", currentUser)}
      {console.log("Current user avatar:", currentUser?.avatar)}
      {console.log("currentUser name:", currentUser?.name)} */}
      <main className="page">
        <div className="profile">
          <div className="profile__container-imgs">
            <img
              src={currentUser?.avatar}
              className="profile__photo"
              alt="User photo"
            />
            <img
              src={imgEdAvatar}
              className="profile__img-edit-avatar"
              onClick={() => props.handleOpenPopup(editAvatarPopup)}
            />
          </div>

          <div className="profile__name-container">
            <div className="contNombre">
              <p className="profile__name">{currentUser?.name}</p>
              <button
                className="profile__boton-edit"
                aria-label="Editar perfil"
              >
                <img
                  src={imgEdButton}
                  className="profile__edit-image"
                  alt="Edit Button"
                  onClick={() => props.handleOpenPopup(editProfilePopup)}
                />
              </button>
            </div>
            <p className="profile__profession">{currentUser?.about}</p>
          </div>

          <button className="profile__boton-plus" aria-label="Agrega imagen">
            <img
              src={imgAddButton}
              className="profile__plus"
              alt="Add button"
              onClick={() => props.handleOpenPopup(newCardPopup)}
            />
          </button>
        </div>
        <ul className="cards__container">
          {cards?.map((card) => (
            <Card
              name={card.name}
              link={card.link}
              clave={card._id}
              key={card._id}
              isLiked={card.isLiked}
              onCardDelete={onCardDelete}
              setCards={setCards}
              onClose={props.onClosePopup}
            />
          ))}
        </ul>

        {props.popup && (
          <Popup onClose={props.onClosePopup} title={props.popup.title}>
            {props.popup.children}
          </Popup>
        )}
      </main>
    </>
  );
}
