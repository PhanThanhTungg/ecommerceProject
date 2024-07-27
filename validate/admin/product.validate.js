const Product = require("../../models/product.model.js")

module.exports.createPOST = async (req,res,next)=>{
  req.body.price = parseInt(req.body.price)
  req.body.discountPercentage = parseInt(req.body.discountPercentage)
  req.body.stock = parseInt(req.body.stock)
  if(req.body.position){
    req.body.position = parseInt(req.body.position)
  }
  else{
    req.body.position = await Product.countDocuments()+1
  }
  if(req.body.title) next()
  else{
    req.flash("error", "vui lòng nhập tiêu đề")
    res.redirect('back')
  }
}
