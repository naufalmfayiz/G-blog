const express = require('express');
const CategoryController = require('../controllers/categoryController');
const authentication = require('../middleware/authenticate');
const { authorRegister } = require('../middleware/authorize');
const router = express.Router()


router.post("/", authentication, CategoryController.addCategory);

router.get("/", authentication, CategoryController.showAllCategory);


router.put("/:id", authentication, authorRegister, CategoryController.updateCategoryById);

router.delete("/:id", authentication, authorRegister, CategoryController.deleteCategoryById);


module.exports = router