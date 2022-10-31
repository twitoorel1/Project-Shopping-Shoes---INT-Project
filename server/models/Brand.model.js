const { Schema, model } = require("mongoose");

const brandSchema = new Schema({
  image: {
    type: String,
    required: [true, "image is required!"],
  },
  name: {
    type: String,
    required: [true, "name is required!"],
    lowercase: true,
  },
});

module.exports = model("Brand", brandSchema);
