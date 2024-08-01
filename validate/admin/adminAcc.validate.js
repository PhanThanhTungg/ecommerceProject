
const AdminAcc = require("../../models/adminAcc.model.js")

module.exports.createPOST = async (req,res,next)=>{
  if(!req.body.fullName){
    req.flash("error", "vui lòng nhập họ tên")
    res.redirect("back")
    return
  }
  if(!req.body.email){
    req.flash("error", "vui lòng nhập email")
    res.redirect("back")
    return
  }
  if(!req.body.password){
    req.flash("error", "vui lòng nhập password")
    res.redirect("back")
    return
  }

  const exitAdminAcc = await AdminAcc.findOne({email: req.body.email, deleted: false})
  if(exitAdminAcc){
    req.flash("error", "email đã tồn tại")
    res.redirect("back")
    return
  }
  next()
}

module.exports.editPATCH = async (req,res,next)=>{
  if(!req.body.fullName){
    req.flash("error", "vui lòng nhập họ tên")
    res.redirect("back")
    return
  }
  if(!req.body.email){
    req.flash("error", "vui lòng nhập email")
    res.redirect("back")
    return
  }

  const exitAdminAcc = await AdminAcc.findOne({_id:{$ne:res.locals.currentAdmin.id},email: req.body.email, deleted: false})
  if(exitAdminAcc){
    req.flash("error", "email đã tồn tại")
    res.redirect("back")
    return
  }
  next()
}
