// var db = require('./queries');
// var express = require('express');
// var bodyparser = require('body-parser');
// var app = express();
// var PORT = process.env.PORT || 8080;
// /* req stands for request, res stands for response */
// app.use(express.static(__dirname));
// app.use(bodyparser.json());
// app.use(bodyparser.urlencoded({ extended: true, }));
// app.get('/product/all', db.GetAllProducts);
// app.get('/product/all/count', db.CountAllProducts);
// app.get('/product/id/:id', db.GetProductById);
// app.get('/product/offset/:offset', db.GetProductByOffset);
// app.delete('/product/:id', db.DeleteProduct);
// app.post('/product/new', db.PostProduct);
// app.post('/product/update', db.UpdateProduct); // Need to review
// app.listen(PORT, function () { console.log('Express is listening port:' + PORT + '!'); })

//-----
const http = require('http');
const port=process.env.PORT || 3000
const server = http.createServer((req, res) => {
res.statusCode = 200;
res.setHeader('Content-Type', 'text/html');
res.end('<h1>Hello World</h1>');
});
server.listen(port,() => {
console.log(`Server running at port `+port);
});