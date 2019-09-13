// var db = require('./queries');
// var express = require('express');
// var bodyparser = require('body-parser');
// var app = express();
// var PORT = process.env.PORT || 8080;
// /* req stands for request, res stands for response */
// app.use(bodyparser.json());
// app.use(bodyparser.urlencoded({ extended: true, }));
// app.get('/product/all', db.GetAllProducts);
// app.get('/product/all/count', db.CountAllProducts);
// app.get('/product/id/:id', db.GetProductById);
// app.get('/product/offset/:offset', db.GetProductByOffset);
// app.delete('/product/:id', db.DeleteProduct);
// app.post('/product/new', db.PostProduct);
// app.post('/product/update', db.UpdateProduct); // Need to review
// console.log("I am alive!!");
// app.listen(PORT, function () { console.log('Express is listening port:' + PORT + '!'); })

const http = require('http');

const server = http.createServer((request, response) => {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("Hello World!");
});

const port = process.env.PORT || 1337;
server.listen(port);

console.log("Server running at http://localhost:%d", port);