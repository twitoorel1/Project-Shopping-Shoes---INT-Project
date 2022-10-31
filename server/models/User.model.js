const { Schema, model } = require("mongoose");
const validateEmail = require("../utils/validateEmail");
const { addressSchema, personalInformation } = require("./Default.model");
const bcrypt = require("bcrypt");

const Minmum_Age = 16;
const Maxmum_Age = 120;

const userSchema = new Schema({
  imgProfile: {
    type: String,
    // required: [true, "Image Profile Is Required!"],
  },
  username: {
    type: String,
    required: [true, "UserName Is Required!"],
    unique: [true, "Username already exist"],
  },
  email: {
    type: String,
    required: [true, "Email Is Required!"],
    unique: [true, "Email already exist"],
    validate: {
      validator: (value) => validateEmail(value),
      message: "Email is invalid",
    },
  },
  password: {
    type: String,
    required: [true, "Please provide a password!"],
  },
  address: addressSchema,
  personalInformation: personalInformation,
  age: {
    type: Number,
    min: [Minmum_Age, `Minimum age must be at least ${Minmum_Age}`],
    max: [Maxmum_Age, `Maximum age can't be more then ${Maxmum_Age}`],
  },
  createAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
});

// Save Password With Encryption
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Check Password from Body To Database password Encryption
userSchema.methods.passwordCorrect = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

module.exports = model("User", userSchema);
