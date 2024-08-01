const Product = require("../../models/product.model")
const productHelper = require("../../helpers/product.helper")

module.exports.index = async (req,res)=>{
  let featuredProducts = await Product.find({deleted: false, status: "active", featured:"1"})
  featuredProducts = productHelper.calNewPrice(featuredProducts)

  let newProducts = await Product.find({deleted: false, status: "active"})
  .sort({position: "desc"}).limit(6)
  newProducts = productHelper.calNewPrice(newProducts)

  res.render("client/pages/home/index.pug",{
    pageTitle:"Trang chủ",
    featuredProducts: featuredProducts,
    newProducts: newProducts
  })
}