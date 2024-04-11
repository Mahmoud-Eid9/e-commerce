const Cart = require('../db/cart')

exports.addToCart = async (req, res) => {
    try {
        const { product_id } = req.body
        console.log(req.user)
        const customer_id = req.user.id
        const quantity =  !req.body.quantity ? 0 : req.body.quantity
        await Cart.addCartItem({ customer_id, product_id, quantity })
        res.status(201).json({message: "Added Successfully"})
    } catch (err){
        console.error(err.message);
        res.status(500).json({error: 'Invalid Cart Item Data Provided'});
    }
}

exports.getCart = async (req, res) => {
    try{
        const data = await Cart.getCartItems(req.user.id)
        res.status(200).json({cart: data})
    } catch (err){
        console.error(err.message);
        res.status(500).json({error: 'Server Error'});
    }
}

exports.deleteCartItem = async (req, res) => {

}