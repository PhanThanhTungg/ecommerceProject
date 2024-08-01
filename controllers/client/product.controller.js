const Product = require("../../models/product.model")
const Category = require("../../models/category.model")

module.exports.index = async(req,res)=>{ //index la ten ham

  const products = await Product.find({
    status: "active",
    deleted: false
  }).sort({position:"desc"})

  const newProducts = products.map(item =>{
    item.newPrice = (item.price*(1-item.discountPercentage/100)).toFixed()
    return item
  })

  res.render("client/pages/product/index.pug",{
    pageTitle: "Trang sản phẩm",
    products: newProducts
  })
}

module.exports.detailCategoryGET = async (req, res) => {
  try {
    const categorySlug = req.params.categorySlug
    const category =await Category.findOne({slug: categorySlug})

    const getListCategory = async (parCateId)=>{
      const listCateId = [parCateId]
      const childrenCates = await Category.find({parent_id: parCateId, deleted: false, status:"active"})
      for(const child of childrenCates){
        listCateId.push(...await getListCategory(child.id))
      }
      return listCateId
    }

    const products = await Product.find({
      category_id:{$in: await getListCategory(category.id)},
      deleted: false,
      status: "active"
    })

    res.render("client/pages/product/index.pug", {
      pageTitle: category.title,
      products: products
    })
    
  } catch (error) {
    res.redirect("/")
  }
  
}