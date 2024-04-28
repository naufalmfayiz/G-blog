const express = require("express");
const UserController = require("../controllers/userController");
const authentication = require("../middleware/authenticate");
const { authorRegister } = require("../middleware/authorize");
const router = express.Router();

router.post(
  "/add-user",
  authentication,
  authorRegister,
  UserController.registerUser
);

router.post("/login", UserController.loginUser);

module.exports = router;
