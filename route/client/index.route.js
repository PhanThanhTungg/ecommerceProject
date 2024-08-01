const homeRoutes = require("./home.route.js")
const productRoutes = require("./product.route.js")
const categoryMiddleWare = require("../../middlewares/client/category.middleware.js")

module.exports = (app)=>{
  app.use(categoryMiddleWare)
  app.use('/',homeRoutes)
  app.use("/products",productRoutes)
}

