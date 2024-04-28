const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const express = require("express");
const router = express.Router();
const PostController = require("../controllers/postController");
const authentication = require("../middleware/authenticate");
const { authorization } = require("../middleware/authorize");

router.post("/", authentication, PostController.addPost);

router.get("/", authentication, PostController.showAllPost);

router.get("/:id", authentication, PostController.showPostById);

router.put(
  "/:id",
  authentication,
  authorization,
  PostController.updatePostById
);

router.delete(
  "/:id",
  authentication,
  authorization,
  PostController.deletePostById
);

router.patch(
  "/:id/img-url",
  authentication,
  authorization,
  upload.single("iniImageUrl"),
  PostController.updateImage
);

module.exports = router;
