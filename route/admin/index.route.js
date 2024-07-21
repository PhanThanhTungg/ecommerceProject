const dashboardRoute = require("./dashboard.route.js")
const systemConfig = require("../../config/system.js")

module.exports = (app)=>{
  const prefixAdmin = systemConfig.prefixAdmin
  app.use(`${prefixAdmin}/dashboard`, dashboardRoute)
}