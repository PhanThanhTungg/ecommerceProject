const Cart = require("../../models/cart.model")
const User = require("../../models/clientAcc.model")

module.exports = async(req,res,next)=>{
  const cartId = req.cookies.cartId
  const user = await User.findOne({token: req.cookies.tokenUser})

  if(!cartId){
    const cart = new Cart()
    await cart.save()
    const time = 30*24*60*60*1000 //ms
    res.cookie("cartId", cart.id,{expires: new Date(Date.now() + time)})
    
  }else{
    let cart = await Cart.findOne({_id: cartId})
    if(cart){
      const user = await User.findOne({token: req.cookies.tokenUser})
      if(user){
        cart = await Cart.findOne({user_id: user.id})
      }
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