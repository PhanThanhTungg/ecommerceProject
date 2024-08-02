const Cart = require("../../models/cart.model")

module.exports = async(req,res,next)=>{
  const cartId = req.cookies.cartId
  if(!cartId){
    const cart = new Cart()
    await cart.save()
    const time = 30*24*60*60*1000 //ms
    res.cookie("cartId", cart.id,{expires: new Date(Date.now() + time)})
  }
  next()
}