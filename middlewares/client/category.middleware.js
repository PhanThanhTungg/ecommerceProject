const ProductCategory = require("../../models/category.model");

const createTreeHelper = require("../../helpers/createTree.helper");

module.exports= async (req, res, next) => {
  const productCategory = await ProductCategory.find({
    deleted: false,
    status: "active"
  })

  const newProductCategory = createTreeHelper(productCategory)

  res.locals.layoutProductCategory = newProductCategory

  next()
}