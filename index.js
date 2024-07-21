require('dotenv').config()
//----------------------

const database = require("./config/database.js")
database.connect()
//----------------------

const express = require('express')
const app = express() // tạo ra ứng dụng, express() cung cấp toàn bộ phương thức và thuộc tính
const port = process.env.PORT
app.listen(port, () => { 
  console.log(`Example app listening on port ${port}`)
})

app.set('views', './views') // để đứng ở thư mục views luôn
app.set('view engine', 'pug') // chọn template engine, có thể thay pug = các engine khác

app.use(express.static('public'))// để biến các thư mục trong file public thành static mà người dùng có thể truy cập vào được

//-----------------------Goi den route

const route = require("./route/client/index.route.js")
route(app)


