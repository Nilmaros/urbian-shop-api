const POOL = require('pg').Pool;
const pool = new POOL({
    user: 'Mitchell',
    host: 'localhost',
    database: 'api',
    port: '5432'
});

var GetAllProducts = (request, response) => {
    pool.query('SELECT * FROM product', (error, result) => {
        if (error) {
            console.log(error);
        }
        response.status(200).json(result.rows);
    })
}

var CountAllProduct = (request, response) => {
    pool.query('SELECT * FROM product', (error, result) => {
        if (error) {
            console.log(error);
        }
        response.status(200).json(result.rowCount);
    })
}

var GetProduct = (request, response) => {
    var id = request.params.id;
    pool.query('SELECT * FROM product WHERE id=$1',[id], (error, result) => {
        if (error) {
            console.log(error);
        }
        response.status(200).json(result.rows);
    })
}

var GetIds = (request, response) => {
    pool.query('SELECT id FROM product', (error, result) => {
        if (error) {
            console.log(error);
        }
        response.status(200).json(result.rows);
    })
}

var AddProduct = (request, response) => {
    var img = request.params.img;
    var desc = request.params.desc;
    var name = request.params.name;
    var price = request.params.price;

    pool.query('INSERT INTO product (description, name, img, price) VALUES ($1, $2, $3, $4);',[desc, name, '../assets/img/'+img, price], (error, result) => {
        if (error) {
            console.log(error);
        }
        response.status(200);
    })
}

module.exports = { GetAllProducts, GetProduct, CountAllProduct, AddProduct, GetIds };