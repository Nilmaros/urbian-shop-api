var db = require('./queries');
var express = require('express');
var bodyparser = require('body-parser');
var app = express();
var PORT = process.env.PORT || 8080;
const config = {
    user: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DATABASE_NAME,
    server: process.env.PROD_DB_SERVER,
    options: {
        encrypt: true
      }
}
// /* req stands for request, res stands for response */
app.use(express.static(__dirname));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true, }));
app.get('/product/all', db.GetAllProducts);
// app.get('/product/all/count', db.CountAllProducts);
// app.get('/product/id/:id', db.GetProductById);
// app.get('/product/offset/:offset', db.GetProductByOffset);
// app.delete('/product/:id', db.DeleteProduct);
// app.post('/product/new', db.PostProduct);
// app.post('/product/update', db.UpdateProduct); // Need to review
app.get('/', (req, res) => {
    res.send(config.user);
});
app.listen(PORT, function () { console.log('Express is listening port:' + PORT + '!'); })

//-----
