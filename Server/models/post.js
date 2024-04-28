'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.Category, { foreignKey: "categoryId" });
      Post.belongsTo(models.User, { foreignKey: "authorId" })
    }
  }
  Post.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'title is required' },
        notEmpty: { msg: 'title is required' }
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: 'content is required' },
        notEmpty: { msg: 'content is required' }
      }
    },
    imgUrl: DataTypes.STRING,
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'category is required' },
        notEmpty: { msg: 'category is required' }
      }
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'user is required' },
        notEmpty: { msg: 'user is required' }
      }
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};