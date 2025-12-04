// const Joi = require("joi");
import Joi from "joi";

export const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).send({
        message: error.details[0].message,
      });
    }

    next(); // Si no hay errores, continúa al siguiente middleware
  };
};

// Middleware para validar ObjectId en parámetros
export const validateObjectId = (paramName) => {
  return (req, res, next) => {
    const id = req.params[paramName];

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        message: `${paramName} no es un ID válido`,
      });
    }

    next();
  };
};

export const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

//valor de validación de la propiedad link
// Joi.string().required().custom(validateUrl);
