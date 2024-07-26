const Category = require("../../models/category.model")
const systemConfig = require("../../config/system.js")
module.exports.index = async (req,res)=>{
  const categorys = await Category.find({deleted: false})
  res.render("admin/pages/category/index.pug",{
    pageTitle:"Danh mục",
    categorys:categorys
  })
}

module.exports.createGET = (req,res)=>{
  res.render("admin/pages/category/create.pug",{
    pageTitle:"Thêm danh mục"
  })
}

module.exports.createPOST = async (req,res)=>{
  if(req.body.position){
    req.body.position = parseInt(req.body.position)
  }
  else{
    req.body.position = await Category.countDocuments()+1
  }

  const category = new Category(req.body)
  category.save()
  req.flash("success","Tạo danh mục thành công")
  res.redirect(`${systemConfig.prefixAdmin}/categorys`)
}
