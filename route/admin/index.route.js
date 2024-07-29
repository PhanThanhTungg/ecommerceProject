const dashboardRoute = require("./dashboard.route.js")
const productRoute = require("./product.route.js")
const categoryRoute = require("./category.route.js")
const roleRoute = require("./role.route.js")
const adminAccRoute = require("./adminAcc.route.js")
const systemConfig = require("../../config/system.js")

module.exports = (app)=>{
  const prefixAdmin = systemConfig.prefixAdmin
  app.use(`${prefixAdmin}/dashboard`, dashboardRoute)
  app.use(`${prefixAdmin}/products`, productRoute)
  app.use(`${prefixAdmin}/categorys`,categoryRoute)
  app.use(`${prefixAdmin}/roles`,roleRoute)
  app.use(`${prefixAdmin}/adminAccs`,adminAccRoute)
}