const express = require("express");
const router = express.Router();

const brandController = require("../controllers/brand.controller");

router.get("/", (req, res) => {
  res.send("Home Brand Page");
});

router.post("/", brandController.createBrand);

router.get("/all", brandController.getAllBrands);
router.get("/oneBrand/:id", brandController.getOneBrand);

router.delete("/delete/:id", brandController.deleteBrand);

module.exports = router;
