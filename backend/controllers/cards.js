import Card from "../models/card.js";

export async function getCards(req, res) {
  console.log("==== GET CARDS ====");
  try {
    const cardsList = await Card.find();
    res.send(cardsList);
  } catch (err) {
    console.log(err.message);
    // res.status(404).send({ message: "Usuario no encontrado" });
    return new NotFoundError(err.message);
  }
}

export async function getCard(req, res) {
  console.log("getCard====");
  const id = req.params.id;
  console.log("elId: " + id);
  card
    .find({ _id: id })
    .orFail(() => {
      if (err == DocumentNotFoundError) {
        const error = new Error(
          "No se ha encontrado ninguna tarjeta con esa id"
        );
        error.statusCode = 404;
        throw error;
      } else {
        const error = new Error("Error al buscar tarjeta");
        error.statusCode = 400;
        throw error;
      }
    })
    .then((card) => res.send({ data: card }))
    .catch(() => res.send({ message: "Error: tarjeta no encontrada" }));
}

export async function likeCard(req, res) {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // agrega _id al array si aún no está ahí
    { new: true }
  );
}

export async function dislikeCard(req, res) {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // elimina _id del array
    { new: true }
  );
}

export async function createCard(req, res) {
  const { name, link, owner } = req.body;

  card
    .create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(400).send({ message: "Error" }));
}

export async function deleteCard(req, res) {
  const id = req.params.id;
  console.log("Id por eliminar: " + id);

  card
    .deleteOne({ _id: id })
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(404).send({ message: "Error al borrar tarjeta" }));
}
