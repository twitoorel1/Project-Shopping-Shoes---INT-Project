const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

// Function For Create And Send Token (Token = Key)
function createTokenAndSend({ _id }) {
  return jwt.sign({ id: _id }, process.env.JWT_SECRET);
}

async function FindUserByUserName(u) {
  return await User.findOne({ username: u });
}

async function FindUserByEmail(e) {
  return await User.findOne({ email: e });
}
// CRUD
// Read = *1
// Create = *3
// Update = *1
// Delete = *1

// Create New User (Register)
exports.register = async (req, res, next) => {
  try {
    const { username, password, email, age } = req.body;
    if (!username) return next(new AppError("Please Provide username", 400));
    if (!password) return next(new AppError("Please Provide password", 400));
    if (!email) return next(new AppError("Please Provide Email", 400));

    if (await FindUserByUserName(username))
      return next(new AppError("Username already exist!", 401));
    if (await FindUserByEmail(email))
      return next(new AppError("Email already exist!", 401));

    if (age <= 17) return next(new AppError("Your age is too young", 403));
    if (age >= 121) return next(new AppError("Your age is too old", 403));

    const newUser = await User.create(req.body);
    newUser.password = undefined;
    const token = createTokenAndSend(newUser);
    res
      .status(201)
      .json({ status: "Success", Message: "Register Success", token });
  } catch (error) {
    console.log(error.message);
    next(new AppError("Register Failed", 400));
  }
};

// Login
exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username) return next(new AppError("Please Provide username", 400));
    if (!password) return next(new AppError("Please Provide password", 400));

    const userLogin = await User.findOne({ username });

    if (!userLogin) return next(new AppError("username does't exist", 404));

    if (!(await userLogin.passwordCorrect(password))) {
      return next(new AppError("Password doesn't match", 403));
    }

    const token = createTokenAndSend(userLogin);
    res.status(200).json({
      status: "Success",
      Message: "Login Successful",
      idUser: userLogin._id,
      username: userLogin.username,
      token,
    });
  } catch (error) {
    console.log(error.message);
    next(new AppError("Login Failed", 400));
  }
};

// Get One User
exports.getOneUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const findOneUser = await User.findById({ _id: id });
    res.status(200).json({
      status: "Success",
      Message: "Get One User Successful",
      data: findOneUser,
    });
  } catch (error) {
    console.log(error.message);
    next(new AppError("Get One User Failed", 400));
  }
};

// Update User
exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;

    const {
      username,
      email,
      age,
      address: { country, city, street, zipCode },
      personalInformation: { firstname, lastname },
    } = req.body;
    // if (!username) return next(new AppError("Please Provide username", 400));
    // if (!email) return next(new AppError("Please Provide email", 400));
    if (!age) return next(new AppError("Please Provide email", 400));
    if (!country) return next(new AppError("Please Provide Country", 400));
    if (!city) return next(new AppError("Please Provide City", 400));
    if (!street) return next(new AppError("Please Provide Street", 400));
    if (!zipCode) return next(new AppError("Please Provide ZipCode", 400));
    if (!firstname) return next(new AppError("Please Provide First Name", 400));
    if (!lastname) return next(new AppError("Please Provide Last Name", 400));

    if (await FindUserByUserName(username))
      return next(new AppError("Username already exist!", 401));
    if (await FindUserByEmail(email))
      return next(new AppError("Email already exist!", 401));

    if (age <= 17) return next(new AppError("Your age is too young", 403));
    if (age >= 121) return next(new AppError("Your age is too old", 403));

    const updateUser = await User.findByIdAndUpdate({ _id: id }, req.body);
    res.status(202).json({
      status: "Success",
      Message: "Update User Successful",
      data: updateUser,
    });
  } catch (error) {
    console.log(error.message);
    next(new AppError("Update User Failed", 400));
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteUser = await User.findByIdAndDelete({ _id: id });
    res.status(203).json({
      status: "Success",
      Message: "Delete User Successful",
      data: deleteUser,
    });
  } catch (error) {
    console.log(error.message);
    next(new AppError("Delete User Failed", 400));
  }
};

// authenticate To FrontEnd
exports.authenticate = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) return next(new AppError("Provide a token", 400));

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    user.password = undefined;

    res
      .status(200)
      .json({ status: "Success", Message: "Authenticate Successful", user });
  } catch (error) {
    console.log(error.message);
    next(new AppError("Authenticate Failed"));
  }
};
