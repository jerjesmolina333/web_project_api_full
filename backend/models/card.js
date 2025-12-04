// const mongoose = require("mongoose");
import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    validate: {
      validator: function (v) {
        return /((https?:\/\/|www\.)[^\s/$.?#].#?)/i.test(v);
      },
      message: (props) => `${props.value} es una liga inválida.`,
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// module.exports = mongoose.model("card", cardSchema);
const Card = mongoose.model("card", cardSchema);
export default Card;
