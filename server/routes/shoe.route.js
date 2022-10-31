const express = require("express");
const router = express.Router();

const shoeController = require("../controllers/shoe.controller");

router.get("/", (req, res) => {
  res.send("Home Shoe Page");
});

router.post("/", shoeController.createShoe);

router.get("/all", shoeController.allShoes);
router.get("/:id", shoeController.getOneShoe);
router.get("/filterByModel/:model", shoeController.getAllShoeByModel);

router.put("/update/:id", shoeController.updateShoe);

router.delete("/delete/:id", shoeController.deleteShoe);
router.delete("/deleteModel/:model", shoeController.deleteModelShoes);

module.exports = router;
