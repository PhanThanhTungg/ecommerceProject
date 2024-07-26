const dashboardRoute = require("./dashboard.route.js")
const productRoute = require("./product.route.js")
const categoryRoute = require("./category.route.js")
const systemConfig = require("../../config/system.js")

module.exports = (app)=>{
  const prefixAdmin = systemConfig.prefixAdmin
  app.use(`${prefixAdmin}/dashboard`, dashboardRoute)
  app.use(`${prefixAdmin}/products`, productRoute)
  app.use(`${prefixAdmin}/categorys`,categoryRoute)
}