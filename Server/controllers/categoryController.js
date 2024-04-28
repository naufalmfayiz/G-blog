const { Post, User, Category } = require("../models");

class CategoryController {
  static async addCategory(req, res, next) {
    try {
      // console.log(req.body)
      const category = await Category.create(req.body);
      res.status(201).json({ category });
    } catch (error) {
      next(error);
    }
  }

  static async showAllCategory(req, res, next) {
    try {
      const categories = await Category.findAll();
      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  }

  static async updateCategoryById(req, res, next) {
    try {
      // console.log(req.params)
      const category = await Category.findByPk(req.params.id);
      if (!category) throw { name: "NotFound" };

      await Category.update(req.body, {
        where: {
          id: req.params.id,
        },
      });

      res.status(200).json({ category });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCategoryById(req, res, next) {
    try {
      const category = await Category.findByPk(req.params.id);
      if (!category) throw { name: "NotFound" };

      await Category.destroy({ where: { id: req.params.id } });

      res.status(200).json({ message: `${category.name} deleted sucesfully` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CategoryController;
