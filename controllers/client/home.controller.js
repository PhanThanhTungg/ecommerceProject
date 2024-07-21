
module.exports.index = (req,res)=>{ //index là tên hàm
  res.render("client/pages/home/index.pug",{
    pageTitle:"Trang chủ"
  })
}