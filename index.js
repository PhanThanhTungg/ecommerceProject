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

app.set('views', `${__dirname}/views`) // để đứng ở thư mục views luôn
app.set('view engine', 'pug') // chọn template engine, có thể thay pug = các engine khác

app.use(express.static(`${__dirname}/public`))// để biến các thư mục trong file public thành static mà người dùng có thể truy cập vào được

app.locals.prefixAdmin = require("./config/system.js").prefixAdmin // biến này dùng cho mọi file pug ở views

//-----------------------setup method-override
var methodOverride = require('method-override')
app.use(methodOverride('_method'))

//-----------------------setup body-parser
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

//-----------------------setup express-flash
var flash = require('express-flash')
var cookieParser = require('cookie-parser')
var session = require('express-session')

app.use(cookieParser('random String'));//random String là password bất kỳ 
app.use(session({ cookie: { maxAge: 60000 }}))
app.use(flash())

//-----------------------config tinymce
var path = require('path')
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')))

//-----------------------moment
const moment = require('moment')
app.locals.moment = moment

//-----------------------Goi den route

const route = require("./route/client/index.route.js")
route(app)

const adminRoute = require("./route/admin/index.route.js")
adminRoute(app)




