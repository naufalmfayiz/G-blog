const express = require("express");
const PublicController = require("../controllers/pubController");
const router = express.Router();

router.get("/posts", PublicController.showAllPostPub);

router.get("/posts/:id", PublicController.showPostPubById);

router.get("/categories", PublicController.showAllCategoryPub);

module.exports = router;
