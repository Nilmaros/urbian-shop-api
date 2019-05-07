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

var CountAllProducts = (request, response) => {
    pool.query('SELECT * FROM product', (error, result) => {
        if (error) {
            console.log(error);
        }
        response.status(200).json(result.rowCount);
    })
}

var GetProductById = (request, response) => {
    var id = request.params.id;
    pool.query('SELECT * FROM product WHERE id=$1',[id], (error, result) => {
        if (error) {
            console.log(error);
        }
        response.status(200).json(result.rows);
    })
}

var GetProductByOffset = (request, response) => {
    var offset = request.params.offset;
    pool.query('SELECT * FROM product ORDER BY id OFFSET $1 FETCH FIRST 1 ROW ONLY',[offset], (error, result) => {
        if (error) {
            console.log(error);
        }
        response.status(200).json(result.rows);
    })
}

var PostProduct = (request, response) => {
    var img = request.body.img;
    var desc = request.body.description;
    var name = request.body.name;
    var price = request.body.price;

    pool.query('INSERT INTO product (description, name, img, price) VALUES ($1, $2, $3, $4);',[desc, name, '../assets/img/'+img, price], (error, result) => {
        if (error) {
            console.log(error);
        }
        response.status(200).json(result);
    })
}

var DeleteProduct = (request, response) => {
    var id = request.params.id;
    pool.query('DELETE FROM product WHERE id=$1',[id], (error, result) => {
        if (error) {
            console.log(error);
        }
        response.status(200).json("Product deleted.");
    })
}

var UpdateProduct = (request, response) => {
    var img = request.params.img;
    var desc = request.params.desc;
    var name = request.params.name;
    var price = request.params.price;
    var id = request.params.id;

    var values =
    [
        {
            "name": "img",
            "value": img
         },
         {
            "name": "description",
            "value": desc
         },
         {
            "name": "name",
            "value": name
         },
         {
            "name": "price",
            "value": price
         }
    ];

    var text = 'UPDATE product SET ';

    for (var i = 0; i < 4; i++)
    {
        if(values[i].value != "empty" || values[i].value != -1)
        {
            if(values[i].name == "img")
            {
                text = text + values[i].name + "='../assets/img/" + values[i].value + "'" + ", ";
            }
            else if(values[i].name == "price")
            {
                text = text + values[i].name + "=" + values[i].value + ", ";
            }
            else
            {
                text = text + values[i].name + "='" + values[i].value + "'" + ", ";
            }
        }
    }
    text = text.substring(0,text.length-2) + ' WHERE id=$1';

    pool.query(text,[id], (error, result) => {
        if (error) {
            console.log(error);
        }
        response.status(200).json(text);
    })
}

module.exports = { GetAllProducts, GetProductById, GetProductByOffset, PostProduct, DeleteProduct, UpdateProduct, CountAllProducts };