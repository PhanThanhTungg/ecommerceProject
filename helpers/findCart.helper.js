const Cart = require("../models/cart.model")
const User = require("../models/clientAcc.model")

module.exports = async (req,res)=>{
  const user = await User.findOne({token:req.cookies.tokenUser})
  const cart = await Cart.findOne(user?{user_id:user.id}:{_id: req.cookies.cartId})
  return cart
}