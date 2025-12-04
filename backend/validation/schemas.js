import Joi from "joi";

// Esquemas para usuarios (los que ya teníamos)
export const loginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(4),
});

export const registerSchema = Joi.object().keys({
  name: Joi.string().required().min(2).max(30),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(4),
  about: Joi.string().max(200).default(""),
  avatar: Joi.string().uri().default(""),
});

export const updateUserSchema = Joi.object().keys({
  name: Joi.string().min(2).max(30),
  about: Joi.string().max(200),
});

export const updateAvatarSchema = Joi.object().keys({
  avatar: Joi.string().uri().required(),
});

// Esquemas para tarjetas
export const createCardSchema = Joi.object().keys({
  name: Joi.string().required().min(2).max(30),
  link: Joi.string().uri().required(),
});
