const { Post, User, Category } = require('../models')

const authorization = async (req, res, next) => {
  try {
    let user = await User.findByPk(req.user.id)
    // console.log(user.id)
    let post = await Post.findByPk(req.params.id)
    // console.log(post.authorId)
    if (!post) { throw { name: "NotFound" } }

    if (user.role === "Staff") {
      if (user.id !== post.authorId) { throw { name: "Forbidden" } };
      next()
    } else if (user.role === "Admin") {
      next()
    } else {
      throw { name: "InvalidToken" }
    }
  } catch (error) {
    next(error)
  }
}

const authorRegister = async (req, res, next) => {
  try {
    let user = await User.findByPk(req.user.id)

    if (user.role === "Staff") {
      { throw { name: "Forbidden" } };
    } else if (user.role === "Admin") {
      next()
    } else {
      throw { name: "InvalidToken" }
    }

  } catch (error) {
    next(error)
  }
}

module.exports = { authorization, authorRegister }