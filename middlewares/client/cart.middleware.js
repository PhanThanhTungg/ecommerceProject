const Cart = require("../../models/cart.model")

module.exports = async(req,res,next)=>{
  const cartId = req.cookies.cartId
  if(!cartId){
    const cart = new Cart()
    await cart.save()
    const time = 30*24*60*60*1000 //ms
    res.cookie("cartId", cart.id,{expires: new Date(Date.now() + time)})
  }else{
    const cart = await Cart.findOne({_id: cartId})
    if(cart){
      const totalQuantity = cart.products.reduce((quantity,val)=>quantity+val.quantity,0)
      cart.totalQuantity = totalQuantity
      res.locals.miniCart = cart
    }
    else{
      res.clearCookie("cartId")
      res.redirect("/")
      return 
    }
  }
  next()
}