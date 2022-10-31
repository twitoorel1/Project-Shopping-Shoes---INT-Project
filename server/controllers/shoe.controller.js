const Shoe = require("../models/Shoe.model");
const AppError = require("../utils/AppError");

// CRUD
// Create = *1
// Read = *3
// UPDATE = *1
// DELETE = *1

// Create New Shoe
exports.createShoe = async (req, res, next) => {
  try {
    const newShoe = await Shoe.create(req.body);
    res
      .status(201)
      .json({ status: "Success", Message: "Add New Shoe", data: newShoe });
  } catch (error) {
    console.log(error.message);
    next(new AppError("Error: Add New Shoe", 400));
  }
};

// Get All Shoes
exports.allShoes = async (req, res, next) => {
  try {
    const allShoes = await Shoe.find().populate("brand");
    res
      .status(201)
      .json({ status: "Success", Message: "All Shoes", data: allShoes });
  } catch (error) {
    console.log(error.message);
    next(new AppError("Error: Get All Shoes", 400));
  }
};

// Find One Shoe (By Id)
exports.getOneShoe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const findShoeById = await Shoe.findById({ _id: id });
    res.status(200).json({
      status: "Success",
      Message: "Find One Shoe",
      data: findShoeById,
    });
  } catch (error) {
    console.log(error.message);
    next(new AppError("Error: Find One Shoe", 400));
  }
};

// Filter Shoe (By Model)
exports.getAllShoeByModel = async (req, res, next) => {
  try {
    const { model } = req.params;
    const filterShoeByModel = await Shoe.find({ model: model.toLowerCase() });
    res.status(200).json({
      status: "Success",
      Message: "Filter Shoe By Model",
      data: filterShoeByModel,
    });
  } catch (error) {
    console.log(error.message);
    next(new AppError("Error: Filter Shoe By Model", 400));
  }
};

// Update One Shoe (By Id)
exports.updateShoe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateShoe = await Shoe.findByIdAndUpdate({ _id: id }, req.body);
    res.status(202).json({
      status: "Success",
      Message: "Update One Shoe",
      data: updateShoe,
    });
  } catch (error) {
    console.log(error.message);
    next(new AppError("Error: Update One Shoe", 400));
  }
};

// Delete One Shoe (By Id)
exports.deleteShoe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteShoe = await Shoe.findByIdAndDelete({ _id: id });
    res.status(203).json({
      status: "Success",
      Message: "Delete One Shoe",
      data: deleteShoe,
    });
  } catch (error) {
    console.log(error.message);
    next(new AppError("Error: Delete One Shoe", 400));
  }
};

// Delete Model Shoes
exports.deleteModelShoes = async (req, res, next) => {
  try {
    const { model } = req.params;
    const deleteModelShoes = await Shoe.deleteMany({
      model: model.toLowerCase(),
    });
    res.status(203).json({
      status: "Success",
      Message: "Delete Model Shoes",
      data: deleteModelShoes,
    });
  } catch (error) {
    console.log(error.message);
    next(new AppError("Error: Delete Model Shoes", 400));
  }
};
