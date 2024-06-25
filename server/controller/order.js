const Order = require('../db/order')
const Shipment = require('../db/shipment')

exports.createOrder = async (req, res) => {
    try {
        if(!req.body){
            return res.status(400).json({err: {message: 'No Cart Provided'}})
        }
        const shipment = await Shipment.getOrCreate(req.user.zone_id)
        req.body.order['shipment_id'] = shipment.id
        req.body.order['customer_id'] = req.user.id
        req.body.order['status'] = 1
        const order = await Order.createOrder(req.body.order)
        await Order.addCartToOrderItems(order.id, req.body.cart, req.user.id)
    } catch (err) {
        return res.status(500).json({err: {message: 'Create Order Server Error'}})
    }
}

exports.getOrder = async (req, res) => {
    
}

exports.deleteOrder = async (req, res) => {
    
}

exports.updateOrder = async (req, res) => {
    
}