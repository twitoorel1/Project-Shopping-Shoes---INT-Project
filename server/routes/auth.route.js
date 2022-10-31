const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");

router.get("/", (req, res) => {
  res.send("Home Auth Page");
});

router.get("/:id", authController.getOneUser);

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/authenticate", authController.authenticate);

router.put("/update/:id", authController.update);

router.delete("/delete/:id", authController.deleteUser);

module.exports = router;
