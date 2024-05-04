const pg = require('../config/db')


exports.addCartItem = (cartItem) => {
    return new Promise(async (resolve, reject) => {
        try {
            await pg.query('INSERT INTO cart (customer_id, product_id, quantity) VALUES ($1, $2, $3) ON CONFLICT (customer_id, product_id) DO UPDATE SET quantity = $3;',
            [cartItem.customer_id, cartItem.product_id, cartItem.quantity])
            resolve(cartItem);
        } catch (err) {
            reject(err)
        }

    })
}


exports.getCartItems = (user_id) => {
    return new Promise(async (resolve, reject) => {
        try{
            const result = await pg.query('select * from cart where customer_id=$1', [user_id])
            const res = result.rows ? result.rows : reject("No Cart Items")
            resolve(res);
        }catch (err) {
            reject(err)
        }
    })
}




exports.deleteCartItem = (cartItem_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const exists = await pg.query('delete from cart where id=$1',
            [cartItem_id])

            if(exists.rows.length > 0){
                const newQuantity = cartItem.quantity+exists.rows[0].quantity
                console.log(newQuantity)
                const result = await pg.query('update cart set quantity=$1 where customer_id=$2 and product_id=$3',
                [newQuantity, cartItem.customer_id,  cartItem.product_id])
            }else{
                const result = await pg.query('insert into cart (customer_id, product_id, quantity) values ($1, $2, $3)',
                [cartItem.customer_id, cartItem.product_id, cartItem.quantity])
            }
            resolve(cartItem);
        } catch (err) {
            reject(err)
        }

    })
}