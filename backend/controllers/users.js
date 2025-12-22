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
  const { name, password, email, about, avatar } = req.body;

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
  const { email, password } = req.body;
  console.log("===== PROCESO LOGIN -> email: ", email, " password: ", password);

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

      return bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) {
          console.log("Contraseña incorrecta");
          return res
            .status(401)
            .send({ message: "Email o contraseña incorrectos" });
        }

        // 3. Crear JWT
        console.log("CREDENCIALES CORRECTAS!!, creando token");
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

export async function getCurrentUser(req, res, next) {
  try {
    console.log("GetCurrentUser. req.user:", req.user);
    console.log("req.user._id:", req.user._id);
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new NotFoundError("Usuario no encontrado");
    }
    res.send({ data: user });
  } catch (err) {
    console.log("ERROR al obtener usuario actual:", err.message);
    next(err);
  }
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
