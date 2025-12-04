// const mongoose = require("mongoose");
import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail.js";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Jacques Cousteau",
  },
  password: {
    type: String,
    minlength: 4,
    required: true,
    select: false,
  },
  email: {
    type: String,
    minlength: 4,
    maxlength: 80,
    validate: {
      validator: function (v) {
        return isEmail(v);
      },
      message: (props) => `${props.value} es un email inválido.`,
    },
    required: true,
    unique: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 60,
    required: true,
    default: "Explorador",
  },
  avatar: {
    type: String,
    validate: {
      validator: function (v) {
        return /((https?:\/\/|www\.)[^\s/$.?#].#?)/i.test(v);
      },
      message: (props) => `${props.value} es una liga inválida.`,
    },
    default:
      "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg",
  },
});

userSchema.statics.findUserByCredentials = async function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("email o password incorrectos"));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error("Incorrect email or password"));
        }

        return user; // ahora user está disponible
      });
    });
};

// module.exports = mongoose.model("user", userSchema);
const User = mongoose.model("user", userSchema);
export default User;
