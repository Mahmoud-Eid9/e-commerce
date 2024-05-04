const pg = require('../config/db')


exports.getProducts = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const products = await pg.query('select * from products')
            resolve(products.rows);
        } catch (err) {
            reject(err)
        }

    })
}