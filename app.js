import express from "express";
import cors from "cors";
import mongoose from "mongoose"; // viene del video
import routerCards from "./routes/cards.js";
import routerUsers from "./routes/users.js";
// const { createUser } = require("./controllers/users.js");
import { createUser, login } from "./controllers/users.js";
import getTokenInfo from "./controllers/middleware/auth.js";
import { requestLogger, errorLogger } from "./controllers/middleware/logger.js";
import { errors } from "celebrate";

// const { PORT = 3000, BASE_PATH } = process.env;
const { PORT = 3000 } = process.env;

const mongoUrl =
  process.env.NODE_ENV === "production"
    ? "mongodb://jerjesm.online:27017/aroundb"
    : "mongodb://localhost:27017/aroundb";

mongoose
  // .connect(mongoUrl)
  .connect("mongodb://localhost:27017/aroundb")
  .then(function () {
    console.log("Conectado a la base de datos");
  })
  .catch(function (err) {
    console.log("Error en la conexión", err);
  });

// crear la aplicación usando el método express:
const app = express();

app.use(cors());
app.options("/", cors()); //habilitar las solicitudes de todas las rutas

app.use(express.json());

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("El servidor va a caer");
  }, 0);
});

app.use(requestLogger); // habilitar el logger de solicitud

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("El servidor va a caer");
  }, 0);
});

app.post("/signin", login);
app.post("/signup", createUser);
app.get("/", (req, res) => {
  res.send("API funcionando");
});

// console.log("app va a llamar a getTokenInfo");
app.use(getTokenInfo());

// Rutas protegidas (con middleware de autenticación)
app.use("/users", routerUsers);
app.use("/cards", routerCards);

app.use(errors()); // controlador de errores de celebrate

// aquí manejamos todos los errores
app.use((err, req, res, next) => {
  res.status(err.statusCode).send({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Ya está el servidor listo en el puerto ${PORT}`);
});
