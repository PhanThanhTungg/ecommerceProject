const Cart = require("../../models/cart.model")

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
      {_id: cartId, 'products.id':productId},{
        'products.$.quantity': quantity+ checkProductInCart.quantity
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