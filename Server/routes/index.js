const express = require("express");
const router = express.Router();

//HOME
router.get("/", (req, res) => {
  res.status(200).json("Welcome to BlogC1");
});

//USER
router.use("/", require("./userRoute"));

//POST
router.use("/posts", require("./postRoute"));

//CATEGORY
router.use("/categories", require("./categoryRoute"));

//PUBLIC
router.use("/pub", require("./pubRoute"));

module.exports = router;
