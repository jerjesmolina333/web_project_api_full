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
import "dotenv/config";

// const { PORT = 3000, BASE_PATH } = process.env;
const { PORT = 3000 } = process.env;

// const mongoUrl =
//   process.env.NODE_ENV === "production"
//     ? "mongodb://jerjesm.online:27017/aroundb"
//     : "mongodb://localhost:27017/aroundb";

console.log("======= app.js:");
console.log("VITE_API_BASE_URL", process.env.VITE_API_BASE_URL);
console.log("Node version (process.version):", process.version);

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

// Configurar CORS explícitamente
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
app.options("*", cors(corsOptions)); // Habilitar pre-flight para todas las rutas

app.use(express.json());

// Logging middleware para debugging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log("Origin:", req.headers.origin);
  next();
});

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("El servidor va a caer");
  }, 0);
});

app.use(requestLogger); // habilitar el logger de solicitud

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
