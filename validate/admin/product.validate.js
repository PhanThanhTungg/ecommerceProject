module.exports.createPOST = (req,res,next)=>{
  if(req.body.title) next()
  else{
    req.flash("error", "vui lòng nhập tiêu đề")
    res.redirect('back')
  }
}
