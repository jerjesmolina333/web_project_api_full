import { useState } from "react";
import ImagePopup from "../../components/Popups/ImagePopup";

import Trash from "../../../images/Trash.svg";
import imgLike from "../../../images//Like.png";
import api from "../../utils/Api.js";

export default function Card(props) {
  const { name, link, isLiked } = props;
  const imageComponent = { title: "", children: null };
  const [imagePopup, setOpenImagePopup] = useState(null);

  async function handleCardLike(cID) {
    // Envía una solicitud a la API y obtén los datos actualizados de la tarjeta
    await api
      .setCardLike(cID)
      .then((newCard) => {
        props.setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === cID ? newCard : currentCard
          )
        );
      })
      .catch((error) => console.error(error));
  }

  async function handleCardNoLike(cID) {
    // Envía una solicitud a la API y obtén los datos actualizados de la tarjeta
    console.log("🔵 Removiendo like de la card ID:", cID);
    await api
      .setCardNoLike(cID)
      .then((newCard) => {
        props.setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === cID ? newCard : currentCard
          )
        );
      })
      .catch((error) => console.error(error));
  }

  const handleLike = () => {
    console.log("🔵 handleLike - isLiked:", isLiked);
    isLiked ? handleCardNoLike(props.clave) : handleCardLike(props.clave);
  };

  // Verifica si el usuario actual le ha dado "like" a la tarjeta
  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_is-active" : ""
  }`;

  function handleOpenImagePopup(imagePopup) {
    setOpenImagePopup(imagePopup);
  }
  function handleCloseImg() {
    setOpenImagePopup(null);
  }

  return (
    <>
      <li className="card__container">
        <img
          className="card__trash"
          src={Trash}
          onClick={() => props.onCardDelete(props.clave)}
          alt="Trash icon"
        />
        <img
          className="card__pic"
          src={link}
          alt=""
          onClick={() => handleOpenImagePopup(imageComponent)}
        />

        <div className="card__group">
          <h2 className="card__name">{name}</h2>
          <img
            className={cardLikeButtonClassName}
            src={imgLike}
            alt="Imagen like"
            onClick={handleLike}
          />
        </div>
      </li>
      {imagePopup && (
        <ImagePopup onClose={handleCloseImg} link={link}></ImagePopup>
      )}
    </>
  );
}
