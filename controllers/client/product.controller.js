const Product = require("../../models/product.model")

module.exports.index = async(req,res)=>{ //index la ten ham

  const products = await Product.find({
    status: "active",
    deleted: false
  }).sort({position:"desc"})

  const newProducts = products.map(item =>{
    item.newPrice = (item.price*(1-item.discountPercentage/100)).toFixed()
    return item
  })

  res.render("client/pages/product/index.pug",{
    pageTitle: "Trang sản phẩm",
    products: newProducts
  })
}

module.exports.detailGET = async (req, res) => {
  const slug = req.params.slug;
  console.log(req)

  const product = await Product.findOne({
    slug: slug,
    deleted: false,
    status: "active"
  });

  if(product) {
    res.render("client/pages/product/detail", {
      pageTitle: "Chi tiết sản phẩm",
      product: product
    });
  } else {
    res.redirect("/");
  }
}