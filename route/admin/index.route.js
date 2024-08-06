const dashboardRoute = require("./dashboard.route.js")
const productRoute = require("./product.route.js")
const categoryRoute = require("./category.route.js")
const roleRoute = require("./role.route.js")
const adminAccRoute = require("./adminAcc.route.js")
const authRoute = require("./auth.route.js")
const adminInfoRoute = require("./adminInfo.route.js")
const settingRoute = require("./setting.route.js")
const systemConfig = require("../../config/system.js")
const authMiddleware = require("../../middlewares/admin/auth.middleware.js")

module.exports = (app)=>{
  const prefixAdmin = systemConfig.prefixAdmin
  app.use(`${prefixAdmin}/dashboard`, authMiddleware,dashboardRoute)
  app.use(`${prefixAdmin}/products`, authMiddleware,productRoute)
  app.use(`${prefixAdmin}/categorys`,authMiddleware,categoryRoute)
  app.use(`${prefixAdmin}/roles`,authMiddleware,roleRoute)
  app.use(`${prefixAdmin}/adminAccs`,authMiddleware,adminAccRoute)
  app.use(`${prefixAdmin}/adminInfo`,authMiddleware,adminInfoRoute)
  app.use(`${prefixAdmin}/setting`,authMiddleware,settingRoute)
  app.use(`${prefixAdmin}/auth`,authRoute)
}