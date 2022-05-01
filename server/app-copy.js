var createError = require('http-errors')
var express = require('express')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var path = require('path')

const publicPath = path.join(__dirname, 'public')
const srcPath = path.join(__dirname, '/src')
const routesPath = path.join(__dirname, '/src', 'views', 'routes')
const viewPath = path.join(__dirname, '/src', 'views')

console.log('directoryPath', __dirname)
console.log()
console.log('publicPath: ', publicPath)
console.log()
console.log('srcPath', srcPath)
console.log()
console.log('routesPath: ', routesPath)
console.log()
console.log('viewPath: ', viewPath)

var indexRouter = require(path.join(viewPath, 'routes'))
var usersRouter = require(path.join(viewPath, 'routes'))
var app = express()

// view engine setup
app.set('views', path.join(srcPath, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(publicPath, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
