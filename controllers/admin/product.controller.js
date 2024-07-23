const Product = require("../../models/product.model.js")
const basicSearchHelper = require("../../helpers/basicSearch.helper.js")
const paginationHelper = require("../../helpers/pagination.helper.js")

module.exports.index = async(req, res)=>{

  let find = {
    deleted: false
  }
  //-------filterStatus
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
   
  const status = req.query.status
  if(status) find.status = status

  //-------Search
  const basicSearchObject = basicSearchHelper(req.query)
  if(basicSearchObject.regex){
    find.title= basicSearchObject.regex
  }

  //-------pagination
  const [totalProduct, currentPage, limit] = [await Product.countDocuments(find),1,4]
  const objectPagination = await paginationHelper(req,totalProduct, currentPage,limit)


  const products = await Product.find(find)
  .skip(objectPagination.skip) //bỏ qua bao nhiêu
  .limit(objectPagination.limit) // giới hạn bao nhiêu


  res.render("admin/pages/product/index.pug",{
    pageTitle: "Products",
    products: products,
    filterStatus: filterStatus,
    keySearch: basicSearchObject.keySearch,
    objectPagination: objectPagination
  })
}

module.exports.changeStatus = async(req,res)=>{
  const [status, id] = [req.params.status, req.params.id]
  await Product.updateOne({_id:id},{status:status})
  res.redirect('back')
}

module.exports.changeMulti = async(req,res)=>{
  const listId = req.body.ids.split(",")
  
  switch(req.body.type){
    case "active":
      await Product.updateMany({_id:{$in:listId}},{status:"active"})
      break
    case "inactive":
      await Product.updateMany({_id:{$in:listId}},{status:"inactive"})
      break
  }
  res.redirect('back')
}

module.exports.deleteItem = async(req,res)=>{
  const id = req.params.id
  await Product.updateOne({_id:id},{deleted: true,deletedAt: new Date()})
  res.redirect('back')
}