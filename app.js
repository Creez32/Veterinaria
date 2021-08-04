const express = require('express');
const app = express();
const path = require('path');
const port = 3030

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/adminRouter');
var productsRouter = require('./routes/product');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* Usar post */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* Carpeta public */
app.use(express.static(path.join(__dirname, 'public')));

/* Rutas */
app.use('/', indexRouter);
app.use('/product', productsRouter)
app.use('/users', adminRouter);


/* Levantar el servidor */

app.listen(port, ()=> console.log('Servidor corriendo en el puerto' + port));
