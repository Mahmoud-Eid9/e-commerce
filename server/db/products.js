const pg = require('../config/db')


exports.getProducts = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const products = await pg.query('select * from products order by id');
            resolve(products.rows);
        } catch (err) {
            reject(err);
        }

    })
}

exports.getProductsPage = (page, limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            const products = await pg.query('select * from products order by id limit ? offset ?', [limit, page-1]);
            resolve(products.rows);
        } catch (err) {
            reject(err);
        }

    })

}

exports.getBestSellingProducts = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const products = await pg.query(`select count(product_id), products.name, products.image_url, products.price, products.description from order_item
                 join products on order_item.product_id = products.id group by product_id, products.name, products.image_url, products.price, products.description
                  order by count desc limit 3`);
            resolve(products.rows);
        } catch (err) {
            reject(err);
        }

    })
}


exports.getLatestProducts = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const products = await pg.query(`select * from products order by id desc limit 5`);
            resolve(products.rows);
        } catch (err) {
            reject(err);
        }

    })
}