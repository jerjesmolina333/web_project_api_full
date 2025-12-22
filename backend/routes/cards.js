/*
 Todas las rutas de este paquete iniciarán con /cards
 */
import express from "express";
import { validateBody } from "../controllers/middleware/validation.js";
import { createCardSchema } from "../validation/schemas.js";

import {
  getCards,
  getCard,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} from "../controllers/cards.js";
const routerCards = express.Router();

routerCards.get("/", getCards);
routerCards.get("/:cardId", getCard);
routerCards.post("/", validateBody(createCardSchema), createCard);
routerCards.delete("/:cardId", deleteCard);
routerCards.put("/:cardId/likes", likeCard);
routerCards.delete("/:cardId/likes", dislikeCard);

export default routerCards;
