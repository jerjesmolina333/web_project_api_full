import express from "express";
import cors from "cors";
import mongoose from "mongoose"; // viene del video
import dotenv from "dotenv";
import routerCards from "./routes/cards.js";
import routerUsers from "./routes/users.js";
import { createUser, login } from "./controllers/users.js";
import getTokenInfo from "./controllers/middleware/auth.js";
import { requestLogger, errorLogger } from "./controllers/middleware/logger.js";
import { errors } from "celebrate";

dotenv.config();

// const { PORT = 3000, BASE_PATH } = process.env;
const { PORT = 3000, MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI)
  .then(function () {
    console.log("Conectado a la base de datos");
  })
  .catch(function (err) {
    console.log("Error en la conexión", err);
  });

// crear la aplicación usando el método express:
const app = express();

// Configurcd ..ar CORS explícitamente
const corsOptions = {
  origin: [
    "https://jerjesm.online",
    "https://www.jerjesm.online",
    "http://localhost:5173",
    "http://localhost:3000",
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("El servidor va a caer");
  }, 0);
});

app.use(requestLogger); // habilitar el logger de solicitud

app.get("/", (req, res) => {
  res.send("API funcionando");
});

app.post("/signin", login);
app.post("/signup", createUser);

// Rutas protegidas (con middleware de autenticación)
app.use("/users", getTokenInfo, routerUsers);
app.use("/cards", getTokenInfo, routerCards);

app.use(errors()); // controlador de errores de celebrate

// aquí manejamos todos los errores
app.use((err, req, res, next) => {
  console.log(err);
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === 500 ? "Se ha producido un error en el servidor" : message,
  });
});

app.listen(PORT, () => {
  console.log(`Ya está el servidor listo en el puerto ${PORT}`);
});
