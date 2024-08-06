const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
  user_id: String,
  products:[{
    id: String,
    quantity: Number
  }],
  createAt:{
    type: Date,
    default: Date.now
  }
},
)

const Cart = mongoose.model("Cart", cartSchema, "carts")
//products: ten collection

module.exports = Cart
