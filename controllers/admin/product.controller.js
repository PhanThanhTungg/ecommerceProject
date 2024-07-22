const Product = require("../../models/product.model.js")

module.exports.index = async(req, res)=>{
  const filterStatus = [
    {
      label:"Tất cả",
      value:""
    },
    {
      label:"Hoạt động",
      value:"active"
    },
    {
      label:"Dừng hoạt động",
      value:"inactive"
    }
  ]
  const find = {
    deleted: false
  }
   
  const status = req.query.status
  if(status) find.status = status

  const keySearch = req.query["keyword"] //req.query.keyword
  if(keySearch) find.title = new RegExp(keySearch, "i")
  //tìm các chuỗi có chứa keysearch không phân biệt hoa thường

  const products = await Product.find(find)


  res.render("admin/pages/product/index.pug",{
    pageTitle: "Products",
    products: products,
    filterStatus: filterStatus,
    keySearch: keySearch
  })
}