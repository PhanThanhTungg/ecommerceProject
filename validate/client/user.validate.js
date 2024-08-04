const User = require("../../models/clientAcc.model")

module.exports.registerPost = async (req, res, next) => {
  if (!req.body.fullName) {
    req.flash("error", `Họ tên không được để trống!`)
    res.redirect("back")
    return
  }

  if (!req.body.email) {
    req.flash("error", `Email không được để trống!`)
    res.redirect("back")
    return
  }

  if (!req.body.password) {
    req.flash("error", `Mật khẩu không được để trống!`)
    res.redirect("back")
    return
  }

  const existUser = await User.findOne({
    email: req.body.email,
    deleted: false
  })
  
  if(existUser) {
    req.flash("error", "Email đã tồn tại!");
    res.redirect("back");
    return
  }

  next()
}

module.exports.loginPost = (req, res, next) => {
  if (!req.body.email) {
    req.flash("error", `Email không được để trống!`)
    res.redirect("back")
    return
  }

  if (!req.body.password) {
    req.flash("error", `Mật khẩu không được để trống!`)
    res.redirect("back")
    return
  }

  next()
}

module.exports.forgotPasswordPost = (req, res, next) => {
  if (!req.body.email) {
    req.flash("error", `Email không được để trống!`)
    res.redirect("back")
    return
  }

  next()
}

module.exports.resetPasswordPost = (req, res, next) => {
  if (!req.body.password) {
    req.flash("error", `Mật khẩu không được để trống!`)
    res.redirect("back")
    return
  }

  if (!req.body.confirmPassword) {
    req.flash("error", `Xác nhận mật khẩu không được để trống!`)
    res.redirect("back")
    return
  }

  if (req.body.password !== req.body.confirmPassword) {
    req.flash("error", `Xác nhận mật khẩu sai!`)
    res.redirect("back")
    return
  }

  next()
}