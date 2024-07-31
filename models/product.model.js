const mongoose = require("mongoose")

slug = require('mongoose-slug-updater')
mongoose.plugin(slug)

const productSchema = new mongoose.Schema({
  title: String,
  category_id:{
    type: String,
    default: ""
  },
  description: String,
  price: Number,
  discountPercentage: Number,
  stock: Number,
  thumbnail: String,
  status: String,
  position: Number,
  slug:{
    type: String,
    slug: "title",
    unique: true
  },
  deleted: {
    type: Boolean,
    default: false
  },
  createBy:{
    id: String,
    date:{
      type: Date,
      default: Date.now
      //date.now cũng được vì mới khai báo, đến lúc tạo sẽ tự chạy vào hàm Date.now()
      //Date.now(), new Date()
    }
  },
  deletedBy:{
    id: String,
    date: Date
  }
},{
  timestamps: true
}
);

const Product = mongoose.model("Product", productSchema, "products")
//products: ten collection

module.exports = Product
