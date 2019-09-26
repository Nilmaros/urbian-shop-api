const sql = require("mssql");
const config = {
    user: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    server: process.env.PROD_DB_SERVER,
    options: {
        encrypt: true
      }
}

const pool = new sql.ConnectionPool(config);

var GetAllProducts = (request, response) => {
    pool.connect(config).then(() => {
        return pool.query('select * from dbo.products')
    }).then(result => {
        response.status(200).json(result.recordset);
        pool.close();
    }).catch(error => {
        console.log(error);
        pool.close();
    })
}

var CountAllProducts = (request, response) => {
    pool.connect(config).then(() => {
        return pool.query('SELECT * FROM dbo.products')
    }).then(result => {
        response.status(200).json(result.recordset.length);
        pool.close();
    }).catch(error => {
        console.log(error);
        pool.close();
    })
}
//---
var GetProductById = (request, response) => {
    var id = request.query.id;

    sql.connect(config).then(() => {
        return sql.query`SELECT * FROM dbo.products WHERE id=${id}`
    }).then(result => {
        response.status(200).json(result.recordset);
        sql.close();
    }).catch(error => {
        console.log(error);
        sql.close();
    })
}

var GetProductByOffset = (request, response) => {
    var offset = request.query.offset;

    pool.connect(config).then(() => {
        return pool.query`SELECT * FROM dbo.products ORDER BY id OFFSET CAST(${offset} AS int) ROWS FETCH FIRST 1 ROW ONLY`
    }).then(result => {
        response.status(200).json(result.recordset);
        pool.close();
    }).catch(error => {
        console.log(error);
        pool.close();
    })
}

var PostProduct = (request, response) => {
    var img = request.body.img;
    var desc = request.body.description;
    var name = request.body.name;
    var price = request.body.price;

    pool.connect(config).then(() => {
        return pool.query`INSERT INTO dbo.products (description, name, img, price) VALUES (${desc}, ${name}, CONCAT('../assets/img/',${img}), ${price})`
    }).then(result => {
        response.status(200).json(result);
        pool.close();
    }).catch(error => {
        console.log(error);
        pool.close();
    })
}

var DeleteProduct = (request, response) => {
    var id = request.query.id;

    pool.connect(config).then(() => {
        return pool.query`DELETE FROM dbo.products WHERE id=${id}`
    }).then(() => {
        response.status(200).json("Product deleted.");
        pool.close();
    }).catch(error => {
        console.log(error);
        pool.close();
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

    pool.connect(config).then(() => {
        return pool.query(text + ` WHERE id=${id}`)
    }).then(() => {
        response.status(200).json("Updated.");
        pool.close();
    }).catch(error => {
        console.log(error);
        pool.close();
    })
}

module.exports = { GetAllProducts, GetProductById, GetProductByOffset, PostProduct, DeleteProduct, UpdateProduct, CountAllProducts };