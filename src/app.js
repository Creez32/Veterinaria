require('dotenv').config()
const express = require('express');
const app = express();
const path = require('path');
const port = 3030;


const methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
const session = require('express-session');
const localCheck = require('./middlewares/localCheck')


/* Routes */

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/adminRouter');
var productsRouter = require('./routes/product');
var userRouter = require('./routes/userRouter');
let apiRouter = require('./routes/Api/apiRouter');
let cartRouter = require('./routes/cartRouter');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* method */
app.use(methodOverride('_method'))

/* Usar post */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* Session y cookies */
app.use(cookieParser());
app.use(session({
    secret:'Veterinaria',
    resave: false,
    saveUninitialized: true
  }));

/* Middlewares */
app.use(localCheck)

/* Carpeta public */
app.use(express.static(path.join(__dirname, '..','public')));

/* Rutas */
app.use('/', indexRouter);
app.use('/product', productsRouter)
app.use('/admin', adminRouter);
app.use('/user', userRouter);
app.use('/api', apiRouter)
app.use('/cart', cartRouter)


/* Levantar el servidor */

app.listen(port, ()=> console.log('Servidor corriendo en http://localhost:' + port));