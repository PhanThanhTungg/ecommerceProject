const Category = require("../../models/category.model")
const systemConfig = require("../../config/system.js")
const createTreeHelper = require("../../helpers/createTree.helper.js")

module.exports.index = async (req,res)=>{
  const categorys = await Category.find({deleted: false})
  const newCategorys = createTreeHelper(categorys)

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

module.exports.editGET = async(req,res)=>{
  try {
    const id = req.params.id
    const category = await Category.findOne({_id:id, deleted: false})

    const categorys = await Category.find({deleted:false})

    res.render("admin/pages/category/edit.pug",{
      pageTitle: "Chỉnh sửa danh mục",
      category: category,
      categorys: createTreeHelper(categorys)
    })
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/categorys`)
  }
}

module.exports.editPATCH = async(req,res)=>{
  const id = req.params.id
  try {
    await Category.updateOne({_id:id}, req.body)
    req.flash("success", "Cập nhật thành công")
    res.redirect("back")
  } catch (error) {
    req.flash("error", "Cập nhật thất bại")
    res.redirect("back")
  }
}