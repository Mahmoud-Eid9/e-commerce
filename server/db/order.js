const pg = require('../config/db')
const CartModel = require('../db/cart')


exports.createOrder = (order) => {

    return new Promise(async (resolve, reject) => {
        try {
            console.log(order)
            const ordered = await pg.query('insert into orders (customer_id, payment_id, shipment_id, total, status_id) values ($1, $2, $3, $4, $5) returning *',
                [order.customer_id, order.payment_id, order.shipment_id, order.total, order.status])
            resolve(ordered.rows[0]);
        } catch (err) {
            reject(err)
        }

    })
}



exports.addCartToOrderItems = (order_id, cart, customer_id) => {

    return new Promise(async (resolve, reject) => {
        try {
            let cart_string = ""
            for(cart_item of cart){
                console.log(cart_item)
                if(cart_string === ""){
                    cart_string = `(${order_id}, ${cart_item.product_id}, ${cart_item.quantity})`
                }else{
                    cart_string = cart_string + `, (${order_id}, ${cart_item.product_id}, ${cart_item.quantity})`
                }
            }
            console.log("hello")
            const order_items = await pg.query(`insert into order_item (order_id, product_id, quantity) values ${cart_string} returning *`)
            console.log(order_items)
            resolve(order_items.rows);
        } catch (err) {
            reject(err)
        }

    })
}