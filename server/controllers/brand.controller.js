const Brand = require("../models/Brand.model");
const AppError = require("../utils/AppError");

// CRUD
// Create = *1
// Read = *2
// Delete = *1

// Get All Brands
exports.getAllBrands = async (req, res, next) => {
  try {
    const allBrands = await Brand.find();
    res
      .status(201)
      .json({ status: "Success", Message: "All Brands", data: allBrands });
  } catch (error) {
    console.log(error.message);
    next(new AppError("Error: Get All Brands", 400));
  }
};

async function FindBrandByName(u) {
  return await Brand.findOne({ name: u });
}

// Create New Brand
exports.createBrand = async (req, res, next) => {
  try {
    const { name, image } = req.body;
    if (!image) return next(new AppError("Please Provide Image", 400));
    if (!name) return next(new AppError("Please Provide Name Brand", 400));

    if (await FindBrandByName(name))
      return next(new AppError("Brand already exist!", 401));

    const newBrand = await Brand.create(req.body);
    res
      .status(201)
      .json({ status: "Success", Message: "Add New Brand", data: newBrand });
  } catch (error) {
    console.log(error.message);
    next(new AppError("Error: Create New Brand", 400));
  }
};

// Find One Brand (By Id)
exports.getOneBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const findBrandById = await Brand.findById({ _id: id });
    res.status(201).json({
      status: "Success",
      Message: "Find One Brand",
      data: findBrandById,
    });
  } catch (error) {
    console.log(error.message);
    next(new AppError("Error: Create New Brand", 400));
  }
};

// Delete Brand
exports.deleteBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteBrand = await Brand.findByIdAndDelete({ _id: id });
    res
      .status(202)
      .json({ status: "Success", Message: "Delete Brand", data: deleteBrand });
  } catch (error) {
    console.log(error.message);
    next(new AppError("Error: Delete Brand", 400));
  }
};
