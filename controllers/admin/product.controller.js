const Product = require("../../models/product.model.js")
const basicSearchHelper = require("../../helpers/basicSearch.helper.js")

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
  let find = {
    deleted: false
  }
   
  const status = req.query.status
  if(status) find.status = status

  const basicSearchObject = basicSearchHelper(req.query)
  if(basicSearchObject.regex){
    find.title= basicSearchObject.regex
  }

  const products = await Product.find(find)


  res.render("admin/pages/product/index.pug",{
    pageTitle: "Products",
    products: products,
    filterStatus: filterStatus,
    keySearch: basicSearchObject.keySearch
  })
}