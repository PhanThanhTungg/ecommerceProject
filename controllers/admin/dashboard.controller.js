const Product = require("../../models/product.model")
const Category = require("../../models/category.model")
const AdminAcc = require("../../models/adminAcc.model")
const ClientAcc = require("../../models/clientAcc.model")
const Role = require("../../models/role.model")



module.exports.index = async (req, res)=>{
  const statistic = {
    product:{
      total: await Product.countDocuments({deleted: false}),
      active: await Product.countDocuments({deleted: false, status: "active"}),
      inactive: await Product.countDocuments({deleted: false, status: "inactive"})
    },
    category:{
      total: await Category.countDocuments({deleted: false}),
      active: await Category.countDocuments({deleted: false, status: "active"}),
      inactive: await Category.countDocuments({deleted: false, status: "inactive"})
    },
    adminAcc:{
      total: await AdminAcc.countDocuments({deleted: false}),
      active: await AdminAcc.countDocuments({deleted: false, status: "active"}),
      inactive: await AdminAcc.countDocuments({deleted: false, status: "inactive"})
    },
    clientAcc:{
      total: await ClientAcc.countDocuments({deleted: false}),
      active: await ClientAcc.countDocuments({deleted: false, status: "active"}),
      inactive: await ClientAcc.countDocuments({deleted: false, status: "inactive"})
    }
  }

  const role = await Role.findOne({_id: res.locals.currentAdmin.role_id})

  res.render("admin/pages/dashboard/index.pug",{
    pageTitle: "Dashboard",
    statistic: statistic,
    role: role
  })
}