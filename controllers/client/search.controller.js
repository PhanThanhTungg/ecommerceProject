const Product = require("../../models/product.model")
const productHelper = require("../../helpers/product.helper")

module.exports.products = async(req,res)=>{
  let products = await Product.find({
    title: new RegExp(req.query.keyword,"i"),
    deleted: false,
    status: "active"
  })

  products = productHelper.calNewPrice(products)

  res.render("client/pages/product/index.pug",{
    pageTitle: "Kết quả tìm kiếm",
    products: products
  })
}