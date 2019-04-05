var db = require('./queries');
var express = require('express');
var bodyparser = require('body-parser');
var app = express();
var PORT = 8080;
/* req stands for request, res stands for response */
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true, }));
app.get('/product/all', db.GetAllProducts);
app.get('/product/count/products', db.CountAllProduct);
app.get('/product/:id', db.GetProduct);
app.post('/product/new/:img/:desc/:name/:price', db.AddProduct);
app.get('/product/get/ids', db.GetIds);

app.listen(PORT, function () { console.log('Express is listening port:' + PORT + '!'); })
