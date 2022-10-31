const { Schema, model } = require("mongoose");

const shoeSchema = new Schema({
  image: {
    type: String,
    required: [true, "image is required!"],
  },
  name: {
    type: String,
    required: [true, "name is required!"],
    lowercase: true,
  },
  size: {
    type: String,
    required: [true, "size is required!"],
    lowercase: true,
  },
  brandName: {
    type: String,
    required: [true, "brand is required!"],
    lowercase: true,
  },
  price: {
    type: Number,
    required: [true, "price is required!"],
  },
  brand: {
    required: [true, "Please Provide Brand"],
    type: Schema.Types.ObjectId,
    ref: "Brand",
  },
  createAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
});

module.exports = model("Shoe", shoeSchema);
