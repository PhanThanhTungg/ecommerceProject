const Product = require("../../models/product.model")

module.exports.index = async(req,res)=>{ //index la ten ham

  const products = await Product.find({
    status: "active",
    deleted: false
  })

  res.render("client/pages/product/index.pug",{
    pageTitle: "Trang sản phẩm",
    products: products
  })
}