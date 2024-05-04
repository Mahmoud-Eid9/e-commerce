const pg = require('../config/db')

exports.getCustomer = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await pg.query('select * from customers where id=$1',
                [id])
            resolve(result.rows[0]);
        } catch (err) {
            reject(err)
        }

    })
}

exports.getCustomerByEmail = (email) => {

    return new Promise(async (resolve, reject) => {
        try {
            const result = await pg.query('select * from customers where email=$1',
                [email])
            console.log(result.rows[0])
            resolve(result.rows[0]);
        } catch (err) {
            reject(err)
        }

    })
}

exports.insertCustomer = (customer) => {

    return new Promise(async (resolve, reject) => {
        try {
            const inserted = await pg.query('insert into customers (first_name, last_name, email, password, phone_number, address, zone_id) values ($1, $2, $3, $4, $5, $6, $7) returning *',
                [customer.first_name, customer.last_name, customer.email, customer.hashPassword, customer.phone_number, customer.address, customer.zone])
            console.log("inserted row: " + inserted)
            resolve(inserted.rows[0]);
        } catch (err) {
            reject(err)
        }

    })
}

async (customer) => {

}