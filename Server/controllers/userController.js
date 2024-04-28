const { checkPassword } = require("../helper/bcrypt");
const { createToken } = require("../helper/jwt");
const { Post, User, Category } = require("../models");

class UserController {
  static async registerUser(req, res, next) {
    try {
      // console.log(req.body)
      let user = await User.create(req.body);

      delete user.dataValues.password;
      let { id, email } = user;
      res.status(201).json({ id, email });
    } catch (error) {
      next(error);
    }
  }

  static async loginUser(req, res, next) {
    try {
      let { email, password } = req.body;
      if (!email || !password) {
        throw { name: "InvalidInput" };
      }

      let user = await User.findOne({ where: { email } });
      if (!user) {
        throw { name: "InvalidUser" };
      }

      let comparePassword = checkPassword(password, user.password);
      if (!comparePassword) {
        throw { name: "InvalidUser" };
      }

      let access_token = createToken({
        id: user.id,
      });
      let { role } = user;
      res.status(200).json({ access_token, email, role });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
