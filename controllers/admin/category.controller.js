const Category = require("../../models/category.model")
const systemConfig = require("../../config/system.js")
const createTreeHelper = require("../../helpers/createTree.helper.js")

module.exports.index = async (req,res)=>{
  const categorys = await Category.find({deleted: false, status: "active"})
  const newCategorys = createTreeHelper(categorys)
  console.log(newCategorys)
  res.render("admin/pages/category/index.pug",{
    pageTitle: "Danh mục",
    categorys: newCategorys
  })
}

module.exports.createGET = async (req,res)=>{
  const categorys = await Category.find({deleted: false, status: "active"})
  const newCategorys = createTreeHelper(categorys)
  res.render("admin/pages/category/create.pug",{
    pageTitle:"Thêm danh mục",
    categorys: newCategorys
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
  await category.save()
  req.flash("success","Tạo danh mục thành công")
  res.redirect(`${systemConfig.prefixAdmin}/categorys`)
}

module.exports.delete = async(req,res)=>{
  const id = req.params.id
  await Category.updateOne({_id:id},{deleted: true,deletedAt: new Date()})
  req.flash('success','Đã chuyển danh mục vào thùng rác')
  res.redirect('back')
}
