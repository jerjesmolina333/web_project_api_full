import Card from "../models/card.js";

export async function getCards(req, res) {
  console.log("==== GET CARDS ====");
  try {
    const cardsList = await Card.find({ owner: req.user._id });
    res.send(cardsList);
  } catch (err) {
    console.log(err.message);
    // res.status(404).send({ message: "Usuario no encontrado" });
    return new NotFoundError(err.message);
  }
}

export async function getCard(req, res) {
  console.log("getCard====");
  const id = req.params.cardId;
  console.log("elId: " + id);

  try {
    const card = await Card.findById(id);
    if (!card) {
      return res.status(404).send({ message: "Tarjeta no encontrada" });
    }
    if (card.owner.toString() !== req.user._id) {
      return res
        .status(403)
        .send({ message: "No tienes permiso para ver esta tarjeta" });
    }
    res.send({ data: card });
  } catch (err) {
    console.log("ERROR al buscar tarjeta:", err.message);
    res.status(400).send({ message: "Error al buscar tarjeta" });
  }
}

export async function likeCard(req, res) {
  console.log("==== LIKE CARD ====");
  try {
    const card = await Card.findById(req.params.cardId);
    if (!card) {
      return res.status(404).send({ message: "Tarjeta no encontrada" });
    }
    if (card.owner.toString() !== req.user._id) {
      return res
        .status(403)
        .send({ message: "No tienes permiso para dar like a esta tarjeta" });
    }
    const updated = await Card.findByIdAndUpdate(
      req.params.cardId,
      { isLiked: true },
      { new: true }
    );
    res.send({ data: updated });
  } catch (err) {
    console.log("ERROR al dar like:", err.message);
    res.status(400).send({ message: "Error al dar like" });
  }
}

export async function dislikeCard(req, res) {
  console.log("==== DISLIKE CARD ====");
  try {
    const card = await Card.findById(req.params.cardId);
    if (!card) {
      return res.status(404).send({ message: "Tarjeta no encontrada" });
    }
    if (card.owner.toString() !== req.user._id) {
      return res
        .status(403)
        .send({ message: "No tienes permiso para quitar like a esta tarjeta" });
    }
    const updated = await Card.findByIdAndUpdate(
      req.params.cardId,
      { isLiked: false },
      { new: true }
    );
    res.send({ data: updated });
  } catch (err) {
    console.log("ERROR al quitar like:", err.message);
    res.status(400).send({ message: "Error al quitar like" });
  }
}

export async function createCard(req, res) {
  console.log("==== CREATE CARD ====");
  console.log("req.user:", req.user);
  console.log("req.body:", req.body);

  const { name, link } = req.body;
  const owner = req.user._id; // El owner es el usuario autenticado

  Card.create({ name, link, owner })
    .then((card) => {
      console.log("Tarjeta creada exitosamente:", card);
      res.status(201).send({ data: card });
    })
    .catch((err) => {
      console.log("ERROR al crear tarjeta:", err.message);
      res
        .status(400)
        .send({ message: "Error al crear tarjeta", error: err.message });
    });
}

export async function deleteCard(req, res) {
  const id = req.params.cardId;
  console.log("==== DELETE CARD ====");
  console.log("Id por eliminar: " + id);

  try {
    const card = await Card.findById(id);
    if (!card) {
      return res.status(404).send({ message: "Tarjeta no encontrada" });
    }

    // Verificar que el usuario sea el owner
    if (card.owner.toString() !== req.user._id) {
      return res
        .status(403)
        .send({ message: "No tienes permiso para eliminar esta tarjeta" });
    }

    await Card.deleteOne({ _id: id });
    res.send({ message: "Tarjeta eliminada exitosamente" });
  } catch (err) {
    console.log("ERROR al borrar tarjeta:", err.message);
    res.status(400).send({ message: "Error al borrar tarjeta" });
  }
}
