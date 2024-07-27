const Category = require("../../models/category.model")
module.exports.createPOST = async (req,res,next)=>{
  if(req.body.position){
    req.body.position = parseInt(req.body.position)
  }
  else{
    req.body.position = await Category.countDocuments({deleted: false})+1
  }
  if(req.body.title) next()
  else{
    req.flash("error", "vui lòng nhập tiêu đề")
    res.redirect('back')
  }
}
