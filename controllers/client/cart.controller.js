const Cart = require("../../models/cart.model")
const Product = require("../../models/product.model")

module.exports.indexGET = async (req,res)=>{
  const cart = await Cart.findOne({_id: req.cookies.cartId})

  let totalPrice = 0

  for(const item of cart.products){
    const product = await Product.findOne({_id: item.id, status: "active", deleted: false})
    product.newPrice = (product.price*(100-product.discountPercentage)/100).toFixed(0)
    
    item.productInfo = product
    item.totalPrice = product.newPrice*item.quantity
    totalPrice += item.totalPrice
  }
  
  cart.totalPrice = totalPrice
  res.render("client/pages/cart/index.pug",{
    pageTitle: "Cart",
    cartDetail: cart
  })
}

module.exports.addPOST = async (req,res)=>{
  const cartId = req.cookies.cartId
  const productId = req.params.productId
  const quantity = parseInt(req.body.quantity)

  const cart = await Cart.findOne({
    _id: cartId
  })

  const checkProductInCart = cart.products.find(item=>item.id==productId)
  if(checkProductInCart){
    await Cart.updateOne(
      {_id: cartId, 'products.id':productId},
      {
        $set:{
          'products.$.quantity': quantity+ checkProductInCart.quantity
        }
      }
    )

  }else{
    await Cart.updateOne({_id: cartId},{
      $push:{
        products:{
          id: productId,
          quantity: quantity
        }
      }
    })
  }
  req.flash("success", "Thêm vào giỏ hàng thành công")
  res.redirect('back')

}

module.exports.deleteDELETE = async (req,res)=>{
  await Cart.updateOne({_id: req.cookies.cartId},
    {
      $pull:{
        products:{_id: req.params.id}
      }
    }
  )
  req.flash("success", "Đã xóa sản phẩm khỏi giỏ hàng")
  res.redirect("back")
}

module.exports.updateGET = async (req,res)=>{
  
  await Cart.updateOne({_id: req.cookies.cartId, 'products._id': req.params.id},{
    $set:{
      'products.$.quantity': parseInt(req.params.quantity)
    }
  })


  req.flash("success", "Thay đổi số lượng thành công")
  res.redirect("back")
}