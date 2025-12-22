/*
 Todas las rutas de este paquete iniciarán con /users
 */
import express from "express";
import { validateBody } from "../controllers/middleware/validation.js";
import {
  loginSchema,
  registerSchema,
  updateUserSchema,
  updateAvatarSchema,
} from "../validation/schemas.js";

// const { createUser } = require("../controllers/users.js");

import {
  createUser,
  login,
  getUsers,
  getUser,
  getCurrentUser,
  updateUser,
  updateAvatar,
} from "../controllers/users.js";
const routerUsers = express.Router();

routerUsers.post("/signin", validateBody(loginSchema), login);
routerUsers.post("/signup", validateBody(registerSchema), createUser);

routerUsers.get("/", getUsers);
routerUsers.get("/me", getCurrentUser);

routerUsers.get("/:id", getUser);
routerUsers.patch("/me", validateBody(updateUserSchema), updateUser);
routerUsers.patch("/me/avatar", validateBody(updateAvatarSchema), updateAvatar);

export default routerUsers;
