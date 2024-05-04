const pg = require('../config/db')


exports.createPayment = (payment) => {
    return new Promise(async (resolve, reject) => {
        try {
            const paid = await pg.query('insert into payment (customer_id, method_id, amount) values ($1, $2, $3) returning id',
                [payment.customer_id, payment.method, payment.amount])
            console.log(paid)
            resolve(paid.rows[0]);
        } catch (err) {
            reject(err)
        }

    })
}