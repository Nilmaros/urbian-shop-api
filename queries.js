const sql = require("mssql");
const config = {
    user: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DATABASE_NAME,
    server: process.env.PROD_DB_SERVER,
    options: {  
        encrypt: true
      }
}

var GetAllProducts = (request, response) => {
    
    sql.connect(config).then(() => {
        return sql.query`select * from dbo.products`
    }).then(result => {
        response.status(200).json(result.recordset);
        console.log(result);
    }).catch(error => {
        console.log(error);
    })
}

var CountAllProducts = (request, response) => {
    pool.query('SELECT * FROM products', (error, result) => {
        if (error) {
            console.log(error);
        }
        response.status(200).json(console.log(result.rowCount));
    })
}

var GetProductById = (request, response) => {
    var id = request.params.id;
    pool.query('SELECT * FROM products WHERE id=$1',[id], (error, result) => {
        if (error) {
            console.log(error);
        }
        response.status(200).json(result.rows);
    })
}

var GetProductByOffset = (request, response) => {
    var offset = request.params.offset;
    pool.query('SELECT * FROM products ORDER BY id OFFSET $1 FETCH FIRST 1 ROW ONLY',[offset], (error, result) => {
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

    pool.query('INSERT INTO products (description, name, img, price) VALUES ($1, $2, $3, $4);',[desc, name, '../assets/img/'+img, price], (error, result) => {
        if (error) {
            console.log(error);
        }
        response.status(200).json(result);
    })
}

var DeleteProduct = (request, response) => {
    var id = request.params.id;
    pool.query('DELETE FROM products WHERE id=$1',[id], (error, result) => {
        if (error) {
            console.log(error);
        }
        response.status(200).json("Product deleted.");
    })
}

var UpdateProduct = (request, response) => {
    var img = request.body.img;
    var desc = request.body.desc;
    var name = request.body.name;
    var price = request.body.price;
    var id = request.body.id;

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

    var text = 'UPDATE products SET ';

    for (var i = 0; i < 4; i++)
    {
        if(values[i].value != "empty" || values[i].value != -1)
        {
            if(values[i].name == "img")
            {
                text = text + values[i].name + "='" + values[i].value + "'" + ", ";
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
            response.status(500).json(error);
        }
        response.status(200).json(text);
    })
}

module.exports = { GetAllProducts, GetProductById, GetProductByOffset, PostProduct, DeleteProduct, UpdateProduct, CountAllProducts };