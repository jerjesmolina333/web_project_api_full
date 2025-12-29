import { useState, useEffect } from "react";
import Popup from "../Main/components/Popup/Popup";
import EditAvatar from "../Main/components/Popup/EditAvatar/EditAvatar";
import EditProfile from "./components/Popup/EditProfile/EditProfile";
import Card from "../../components/Card/Card";
import NewCard from "./components/Popup/NewCard/NewCard";
import Api from "../../utils/Api";
import { getToken } from "../../utils/token";

import imgEdAvatar from "../../../images/Icono_ed_avatar.png";
import imgAddButton from "../../../images/AddButton.png";
import imgEdButton from "../../../images/EditButton.png";

export default function Main(props) {
  const [cards, setCards] = useState([]);

  const jwt = getToken();

  const params = {
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  };

  const api = new Api(
    {
      linkUser: "https://api.jerjesm.online/users/me",
      linkImags: "https://api.jerjesm.online/cards/",
    },
    params
  );

  useEffect(() => {
    async function getCards() {
      try {
        const cardsList = await api.getImagesList();
        setCards(cardsList);
      } catch (error) {
        console.error("❌ Error loading cards:", error);
      }
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
        currentUser={props.userData}
        handleUpdateUser={props.handleUpdateUser}
        handleClosePopup={props.handleClosePopup}
      />
    ),
  };

  const handleAddPlaceSubmit = (data) => {
    (async () => {
      await api.insertaImagen(data).then((newData) => {
        const cardData = newData.data || newData; // Por si la estructura varía
        const newCard = {
          name: cardData.name,
          link: cardData.link,
          _id: cardData._id,
          isLiked: cardData.isLiked || false,
        };
        const nuevosDatos = [newCard, ...cards];
        setCards(nuevosDatos);
      });
    })();
  };

  const newCardPopup = {
    title: "Nuevo lugar",
    children: (
      <NewCard
        handleClosePopup={props.handleClosePopup}
        handleAddPlaceSubmit={handleAddPlaceSubmit}
      />
    ),
  };

  const editAvatarPopup = {
    title: "Edición de avatar",
    children: (
      <EditAvatar
        currentUser={props.userData}
        handleClosePopup={props.handleClosePopup}
        handleUpdateAvatar={props.handleUpdateAvatar}
      />
    ),
  };

  return (
    <>
      <main className="page">
        <div className="profile">
          <div className="profile__container-imgs">
            <img
              src={props.userData?.avatar}
              className="profile__photo"
              alt="User photo"
            />
            <img
              src={imgEdAvatar}
              className="profile__img-edit-avatar"
              onClick={(e) => {
                e.stopPropagation();
                props.handleOpenPopup(editAvatarPopup);
              }}
            />
          </div>

          <div className="profile__name-container">
            <div className="contNombre">
              <p className="profile__name">{props.userData?.name}</p>
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
            <p className="profile__profession">{props.userData?.about}</p>
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
              onClose={props.handleClosePopup}
              api={api}
            />
          ))}
        </ul>

        {props.popup && (
          <Popup onClose={props.handleClosePopup} title={props.popup.title}>
            {props.popup.children}
          </Popup>
        )}
      </main>
    </>
  );
}
