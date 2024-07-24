const Product = require("../../models/product.model.js")
const basicSearchHelper = require("../../helpers/basicSearch.helper.js")
const paginationHelper = require("../../helpers/pagination.helper.js")
const systemConfig = require("../../config/system.js")

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
  .sort({position:"desc"})
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
  req.flash('success', 'Thay đổi trạng thái thành công')
  res.redirect('back')
}

module.exports.changeMulti = async(req,res)=>{
  const listId = req.body.ids.split(",")
  
  switch(req.body.type){
    case "active":
      await Product.updateMany({_id:{$in:listId}},{status:"active"})
      req.flash('success',`${listId.length} sản phẩm đã cập nhật thành trạng thái hoạt động`)
      break
    case "inactive":
      await Product.updateMany({_id:{$in:listId}},{status:"inactive"})
      req.flash('success',`${listId.length} sản phẩm đã cập nhật thành trạng thái dừng hoạt động`)
      break
    case "deleteAll":
      await Product.updateMany({_id:{$in:listId}},{deleted: true,deletedAt: new Date()})
      req.flash('success',`Đã xóa ${listId.length} sản phẩm`)
      break
    case 'changePosition':
      req.flash('success',`Đã thay đổi vị trí ${listId.length} sản phẩm`)
      listId.forEach(async item=>{
        const [id,pos] = item.split("-")
        await Product.updateOne({_id: id},{position:pos})
      })
      break
  }
  res.redirect('back')
}

module.exports.deleteItem = async(req,res)=>{
  const id = req.params.id
  await Product.updateOne({_id:id},{deleted: true,deletedAt: new Date()})
  res.redirect('back')
}

module.exports.createGET = async(req, res)=>{
  res.render("admin/pages/product/create.pug",{
    pageTitle: "Thêm mới sản phẩm"
  })
}

module.exports.createPOST = async(req, res)=>{
  req.body.price = parseInt(req.body.price)
  req.body.discountPercentage = parseInt(req.body.discountPercentage)
  req.body.stock = parseInt(req.body.stock)
  if(req.body.position){
    req.body.position = parseInt(req.body.position)
  }
  else{
    req.body.position = await Product.countDocuments()+1
  }
  if(req.file) req.body.thumbnail = `/uploads/${req.file.filename}`
  // link đã đi thẳng vào public
  const product = new Product(req.body)
  await product.save()

  req.flash("success", "Tạo sản phẩm thành công")
  res.redirect(`${systemConfig.prefixAdmin}/products`)
}