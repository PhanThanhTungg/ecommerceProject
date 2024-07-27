const Product = require("../../models/product.model.js")
const Category = require("../../models/category.model")

const basicSearchHelper = require("../../helpers/basicSearch.helper.js")
const paginationHelper = require("../../helpers/pagination.helper.js")
const createTreeHelper = require("../../helpers/createTree.helper.js")

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

  //-------sortByMultipleCriteria
  let sort = {}
  
  if(req.query.keySort && req.query.valueSort){
    sort[req.query.keySort] = req.query.valueSort
  }
  else{
    sort.position = 'desc'
  }


  const products = await Product.find(find)
  .skip(objectPagination.skip) //bỏ qua bao nhiêu
  .limit(objectPagination.limit) // giới hạn bao nhiêu
  .sort(sort)


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
    case "moveToBin":
      await Product.updateMany({_id:{$in:listId}},{deleted: true,deletedAt: new Date()})
      req.flash('success',`Đã chuyển ${listId.length} sản phẩm vào thùng rác`)
      break
    case "deleteAll":
      await Product.deleteMany({_id:{$in:listId}})
      req.flash('success',`Đã xóa vĩnh viễn${listId.length} sản phẩm`)
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
  req.flash('success','Đã chuyển sản phẩm vào thùng rác')
  res.redirect('back')
}

module.exports.createGET = async(req, res)=>{
  const categorys = await Category.find({deleted: false, status: "active"})
  res.render("admin/pages/product/create.pug",{
    pageTitle: "Thêm mới sản phẩm",
    categorys: createTreeHelper(categorys)
  })
}

module.exports.createPOST = async(req, res)=>{
  const product = new Product(req.body)
  await product.save()

  req.flash("success", "Tạo sản phẩm thành công")
  res.redirect(`${systemConfig.prefixAdmin}/products`)
}

module.exports.editGET = async(req,res)=>{
  try {
    const id = req.params.id

    const product = await Product.findOne({
      _id:id,
      deleted:false
    })

    const categorys = await Category.find({deleted: false, status: "active"})
    const category = await Category.findOne({_id: product.category_id})

    res.render("admin/pages/product/edit.pug",{
      pageTitle: "Chỉnh sửa sản phẩm",
      product: product,
      categorys: createTreeHelper(categorys),
      categoryProduct:category
    })
  } catch (error) {
    req.flash("error","Đường link không tồn tại")
    res.redirect(`${systemConfig.prefixAdmin}/products`)
  }
}

module.exports.editPATCH = async(req, res)=>{
  await Product.updateOne({_id:req.params.id},req.body)

  req.flash("success", "Cập nhật sản phẩm thành công")
  res.redirect(`back`)
}

module.exports.detailGET = async(req,res)=>{
  const id = req.params.id
  const product = await Product.findOne({_id:id,deleted:false})
  const category = await Category.findOne({_id: product.category_id})
  res.render("admin/pages/product/detail.pug",{
    pageTitle: product.title,
    product: product,
    categoryTitle: category.title
  })
}