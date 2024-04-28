const { Post, User, Category } = require("../models");
const { Op } = require("sequelize");

class PublicController {
  static async showAllPostPub(req, res, next) {
    try {
      let { search, filter, sort, page } = req.query;
      console.log(req.query);
      let querySQL = {};

      //search
      if (search) {
        querySQL.where = {
          ...querySQL.where,
          title: {
            [Op.iLike]: `%${search}%`,
          },
        };
      }

      //filtering
      if (filter) {
        querySQL.where = {
          ...querySQL.where,
          categoryId: filter,
        };
      }

      //sorting
      if (sort) {
        querySQL.order = [["createdAt", sort.toUpperCase()]];
      }

      let limit = 10;
      let pageNumber = 1;
      querySQL.limit = limit;
      //pagination
      if (page) {
        if (page.size) {
          limit = +page.size;
          querySQL.limit = limit;
        }
        if (page.number) {
          pageNumber = +page.number;
          querySQL.offset = limit * (page.number - 1);
        }
      }

      const { count, rows } = await Post.findAndCountAll(querySQL);

      res.status(200).json({
        page: pageNumber,
        data: rows,
        totalData: count,
        totalPage: Math.ceil(count / limit),
        dataPerPage: limit,
      });
    } catch (error) {
      // next(error);
      console.log(error);
    }
  }

  static async showPostPubById(req, res, next) {
    try {
      let { id } = req.params;
      const post = await Post.findByPk(id);

      if (!post) throw { name: "NotFound" };

      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  }

  static async showAllCategoryPub(req, res, next) {
    try {
      const categories = await Category.findAll();
      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PublicController;
