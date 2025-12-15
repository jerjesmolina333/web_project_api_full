import { celebrate, Joi } from "celebrate";
import express from "express";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import BadRequestError from "../errors/bad-request-err.js";
import UnauthorizedError from "../errors/unauthorized-err.js";
import NotFoundError from "../errors/not-found-err.js";
// Para validación:
import { validateBody } from "./middleware/validation.js";
import { loginSchema } from "../validation/schemas.js";

dotenv.config();

const { NODE_ENV, JWT_SECRET } = process.env;

export const createUser = async (req, res) => {
  console.log("Nuevo usuario");
  console.log("body", req.body);
  const { name, password, email, about, avatar } = req.body;

  console.log("name:", name, " password:", password, " email:", email);
  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name: name,
        password: hash, // añadir el hash a la base de datos
        email: email,
        about: about,
        avatar: avatar,
      })
    )
    .then((user) => {
      res.status(201).send({
        _id: user._id,
        email: user.email,
      });
    })
    // .catch((err) => res.status(400).send(err));
    .catch((err) => {
      res.status(400).send({ message: err.message }); // ✅ Envía respuesta
    });
};

export async function login(req, res) {
  console.log("Backend -> login ===");
  console.log("req.body completo:", req.body);
  console.log("typeof req.body:", typeof req.body);
  const { email, password } = req.body;
  console.log("email extraído:", email, "tipo:", typeof email);
  console.log("password extraído:", password, "tipo:", typeof password);
  console.log("Backend -> email: ", email, " password: ", password);

  // 1. Buscar usuario por email
  User.findOne({ email })
    .select("+password")
    .then((user) => {
      console.log("Usuario encontrado:", user); // NUEVO LOG
      if (!user) {
        console.log("Usuario no encontrado");
        return res
          .status(401)
          .send({ message: "Email o contraseña incorrectos" });
      }

      console.log("user.password:", user.password); // NUEVO LOG
      console.log("password a comparar:", password); // NUEVO LOG

      // 2. Comparar contraseña
      return bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) {
          console.log("Contraseña incorrecta");
          return res
            .status(401)
            .send({ message: "Email o contraseña incorrectos" });
        }

        // 3. Crear JWT
        console.log("Credenciales correctas, creando token");
        const token = jwt.sign(
          { _id: user._id },
          NODE_ENV === "production" ? JWT_SECRET : "frase-secreta",
          { expiresIn: "7d" }
        );

        res.send({ token });
      });
    })
    .catch((err) => {
      console.log("ERROR en login:", err.message);
      res.status(500).send({ message: "Error interno del servidor" });
    });
}

export async function getUsers(req, res) {
  console.log("GetUsers. req.user:", req.user);
  try {
    const usersList = await User.find();
    res.send(usersList);
  } catch (err) {
    console.log(err.message);
    // res.status(404).send({ message: "Usuario no encontrado" });
    return new NotFoundError(err.message);
  }
}

export async function getUserByMail(req, res) {
  console.log("= GetUserByMail ==");
  const email = req.email;
  // console.log("getUserBYId. _id:", _id);
  User.findOne({ email: email })
    .orFail(() => {
      if (err == DocumentNotFoundError) {
        const error = new Error(
          "No se ha encontrado ningun usuario con ese email"
        );
        error.statusCode = 404;
        throw error;
        throw new NotFoundError("No se encontró un usuario con ese email");
      } else {
        const error = new Error("Error al buscar usuario");
        error.statusCode = 400;
        throw error;
        throw new NotFoundError("Error al buscar usuario");
      }
    })
    .then((user) => res.send({ data: user }))
    // .catch(() => res.send({ message: "Error: usuario no encontrado" }));
    .catch(next);
}

export async function updateUser(req, res, next) {
  const id = req.params.me;
  console.log("elId: " + id);
  const { name, about, avatar } = req.body;
  user
    .patch({ _id: id, name, about, avatar })
    .orFail(() => {
      if (err == DocumentNotFoundError) {
        const error = new Error(
          "No se ha encontrado ningun usuario con esa id"
        );
        error.statusCode = 404;
        throw error;
        throw new NotFoundError("No se encontró un usuario con ese email");
      } else {
        const error = new Error("Error al actualizar usuario");
        error.statusCode = 400;
        throw error;
        throw new BadRequestError("Error al actualizar usuario");
      }
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
}

export async function updateAvatar(req, res) {
  const id = req.params.me;
  console.log("elId: " + id);
  const avatar = req.params.avatar;
  user
    .patch({ _id: id, avatar, next })
    .orFail(() => {
      if (err == DocumentNotFoundError) {
        const error = new Error(
          "No se ha encontrado ningun usuario con esa id"
        );
        error.statusCode = 404;
        throw error;
        throw new NotFoundError(
          "No se ha encontrado ningun usuario con esa id"
        );
      } else {
        const error = new Error("Error al actualizar avatar de usuario");
        error.statusCode = 400;
        throw error;
        throw new BadRequestError("Error al actualizar avatar de usuario");
      }
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
}
