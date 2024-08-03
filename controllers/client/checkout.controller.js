const Cart = require("../../models/cart.model")
const Product = require("../../models/product.model")
const Order = require("../../models/order.model")
module.exports.indexGET = async(req,res)=>{
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

  res.render("client/pages/checkout/index.pug",{
    pageTitle: "Check out",
    cartDetail: cart
  })
}

module.exports.orderPOST = async(req,res)=>{
  const order = new Order({
    cart_id: req.cookies.cartId,
    userInfo: req.body
  })

  const cart = await Cart.findOne({_id: req.cookies.cartId})
  const products = []
  for (const item of cart.products) {
    const product = await Product.findOne({
      _id: item.id
    })

    const objectProduct = {
      product_id: item.id,
      price: product.price,
      discountPercentage: product.discountPercentage,
      quantity: item.quantity,
    }

    products.push(objectProduct)
  }
  order.products = products

  await Order.create(order)

  cart.products = []
  await cart.save()

  req.flash("success", "Đặt hàng thành công")
  res.redirect(`/checkout/success/${order.id}`)
}

module.exports.successGET = async(req,res)=>{
  try {
    const order = await Order.findOne({
      _id: req.params.orderId
    })

    order.totalPrice = 0

    for (const product of order.products) {
      const productInfo = await Product.findOne({
        _id: product.product_id
      })

      product.title = productInfo.title
      product.thumbnail = productInfo.thumbnail
      product.priceNew = (product.price * (100 - product.discountPercentage)/100).toFixed(0)
      product.totalPrice = product.priceNew * product.quantity

      order.totalPrice += product.totalPrice
    }

    res.render("client/pages/checkout/success", {
      pageTitle: "Đặt hàng thành công",
      order: order
    })
  } catch (error) {
    res.redirect("/");
  }
}