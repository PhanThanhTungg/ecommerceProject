const User = require("../../models/clientAcc.model.js");

module.exports.infoUser = async (req, res, next) => {
  if(req.cookies.tokenUser) {
    const user = await User.findOne({
      token: req.cookies.tokenUser,
      deleted: false,
      status: "active"
    }).select("-password")

    if(user) {
      res.locals.user = user
    }
    else{
      res.clearCookie("tokenUser")
      res.redirect("/")
      return 
    }
  }
  
  next()
}

module.exports.auth = async(req,res,next)=>{
  if(res.locals.user){
    next()
  }
  else{
    res.redirect("/user/login")
  }
}