const mssql = require("mssql");
const config = {
    user: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    server: process.env.PROD_DB_SERVER,
    options: {
        encrypt: true
      }
}

const sql = new mssql.ConnectionPool(config).connect();

var GetAllProducts = (request, response) => {
    sql.then(pool => {
        return pool.request().query('select * from dbo.products')
    }).then(result => {
        response.status(200).json(result.recordset);
    }).catch(error => {
        console.log(error);
    })
}

var CountAllProducts = (request, response) => {
    sql.then(pool => {
        return pool.request().query('SELECT * FROM dbo.products')
    }).then(result => {
        response.status(200).json(result.recordset.length);
    }).catch(error => {
        console.log(error);
    })
}
//---
var GetProductById = (request, response) => {
    var id = request.query.id;

    sql.then(pool => {
        return pool.request().query`SELECT * FROM dbo.products WHERE id=${id}`
    }).then(result => {
        response.status(200).json(result.recordset);
    }).catch(error => {
        console.log(error);
    })
}

var GetProductByOffset = (request, response) => {
    var offset = request.query.offset;

    sql.then(pool => {
        return pool.request().query`SELECT * FROM dbo.products ORDER BY id OFFSET CAST(${offset} AS int) ROWS FETCH FIRST 1 ROW ONLY`
    }).then(result => {
        response.status(200).json(result.recordset);
    }).catch(error => {
        console.log(error);
    })
}

var PostProduct = (request, response) => {
    var img = request.body.img;
    var desc = request.body.description;
    var name = request.body.name;
    var price = request.body.price;

    sql.then(pool => {
        return pool.request().query`INSERT INTO dbo.products (description, name, img, price) VALUES (${desc}, ${name}, CONCAT('../assets/img/',${img}), ${price})`
    }).then(result => {
        response.status(200).json(result);
    }).catch(error => {
        console.log(error);
    })
}

var DeleteProduct = (request, response) => {
    var id = request.query.id;

    sql.then(pool => {
        return pool.request().query`DELETE FROM dbo.products WHERE id=${id}`
    }).then(() => {
        response.status(200).json("Product deleted.");
    }).catch(error => {
        console.log(error);
    })
}

var UpdateProduct = (request, response) => {
    var img = request.body.img;
    var desc = request.body.description;
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
    
    var text = 'UPDATE dbo.products SET ';

    for (var i = 0; i < 4; i++)
    {
        if(values[i].value != "empty" && values[i].value != -1 && values[i].value != undefined)
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
    text = text.substring(0,text.length-2);

    sql.then(pool => {
        return pool.request().query(text + ` WHERE id=${id}`)
    }).then(() => {
        response.status(200).json("Updated.");
    }).catch(error => {
        console.log(error);
    })
}

module.exports = { GetAllProducts, GetProductById, GetProductByOffset, PostProduct, DeleteProduct, UpdateProduct, CountAllProducts };