const { Post, User, Category } = require("../models");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

class PostController {
  static async addPost(req, res, next) {
    try {
      let { title, content, imgUrl, categoryId, authorId } = req.body;
      // console.log(req.body)
      let post = await Post.create({
        title,
        content,
        imgUrl,
        categoryId,
        authorId: req.user.id,
      });
      res.status(201).json({ post });
    } catch (error) {
      next(error);
    }
  }

  static async showAllPost(req, res, next) {
    try {
      const posts = await Post.findAll({
        include: {
          model: User,
          attributes: { exclude: ["password"] },
        },
      });
      res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  }

  static async showPostById(req, res, next) {
    try {
      let { id } = req.params;
      const post = await Post.findByPk(id, {
        include: {
          model: User,
          attributes: { exclude: ["password"] },
        },
      });

      if (!post) throw { name: "NotFound" };

      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  }

  static async updatePostById(req, res, next) {
    try {
      // console.log(req.user)
      let { title, content, imageUrl, categoryId, authorId } = req.body;
      let update = await Post.update(
        { title, content, imageUrl, categoryId, authorId },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      if (!update) throw { name: "NotFound" };

      const post = await Post.findByPk(req.params.id);
      if (!post) throw { name: "NotFound" };

      res.status(200).json({ post });
    } catch (error) {
      next(error);
    }
  }

  static async deletePostById(req, res, next) {
    try {
      const post = await Post.findByPk(req.params.id);
      if (!post) throw { name: "NotFound" };

      await Post.destroy({ where: { id: req.params.id } });

      res.status(200).json({ message: `${post.title} success to delete` });
    } catch (error) {
      next(error);
    }
  }

  static async updateImage(req, res, next) {
    try {
      // console.log(req.file)
      let { id } = req.params;
      const post = await Post.findByPk(id);

      if (!post) throw { name: "NotFound" };
      if (!req.file) throw { name: "FileRequired" };

      const base64String = req.file.buffer.toString("base64");
      let dataUrl = `data:${req.file.mimetype};base64,${base64String}`;
      // console.log(dataUrl);

      let result = await cloudinary.uploader.upload(dataUrl, {
        public_id: req.file.originalname,
        folder: "BlogC1",
      });

      await Post.update(
        { imgUrl: result.secure_url },
        {
          where: { id },
        }
      );

      res
        .status(200)
        .json({ message: `Image ${post.title} success to update` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PostController;
