const homeRoutes = require("./home.route.js")
const productRoutes = require("./product.route.js")
const searchRoutes = require("./search.route.js")
const cartRoutes = require("./cart.route.js")
const checkoutRoutes = require("./checkout.route.js")
const userRoutes = require("./user.route.js")
const categoryMiddleWare = require("../../middlewares/client/category.middleware.js")
const cartMiddleWare = require("../../middlewares/client/cart.middleware.js")

module.exports = (app)=>{
  app.use(categoryMiddleWare)
  app.use(cartMiddleWare)

  app.use('/',homeRoutes)
  app.use("/products",productRoutes)
  app.use("/search", searchRoutes)
  app.use("/cart", cartRoutes)
  app.use("/checkout", checkoutRoutes)
  app.use("/user", userRoutes)
}

