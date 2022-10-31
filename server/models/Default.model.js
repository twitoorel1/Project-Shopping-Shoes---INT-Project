const { Schema, model } = require("mongoose");

// Personal Information
const personalInformation = new Schema({
  firstname: { type: String },
  lastname: { type: String },
});

// Address
const addressSchema = new Schema({
  country: { type: String, default: "Israel" },
  city: { type: String, default: "Netivot" },
  street: { type: String, default: "tzahal 19" },
  zipCode: { type: Number, default: "80200" },
});

module.exports = { addressSchema, personalInformation };
