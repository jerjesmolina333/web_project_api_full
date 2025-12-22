import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UnauthorizedError from "../../errors/unauthorized-err.js";

dotenv.config();
const { NODE_ENV, JWT_SECRET } = process.env;

function getTokenInfo(req, res, next) {
  // Obtener el token del header Authorization
  const { authorization } = req.headers;
  console.log("Middleware auth.js -> authorization:", authorization);
  if (!authorization || !authorization.startsWith("Bearer ")) {
    console.log("ERROR: Autorización requerida");
    return next(new UnauthorizedError("Autorización requerida"));
  }
  // Extraer el token (quitar "Bearer ")
  console.log("Se va a extraer Bearer del token");
  const token = authorization.replace("Bearer ", "");
  try {
    // Verificar el token JWT
    const payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "frase-secreta"
    );
    req.user = payload; // Añadir el payload al objeto req
    console.log("Token verificado, usuario:", req.user);
    next(); // Continuar al siguiente middleware
  } catch (err) {
    console.log("ERROR: Token inválido");
    return next(new UnauthorizedError("Token inválido"));
  }
}

export default getTokenInfo;
