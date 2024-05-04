const Payment = require('../db/payment')
const Order = require('../db/order')
const orderController = require('../controller/order')

exports.createPayment = async (req, res) => {
    try {
        if(!req.body){
            return res.status(400).json({err: {message: 'No Data Provided'}})
        }
        req.body.payment['customer_id'] = req.user.id
        const payment = await Payment.createPayment(req.body.payment)
        req.body.order['payment_id'] = payment.id
        req.body.payment['customer_id'] = req.user.id
        await orderController.createOrder(req, res)
        return res.status(201).json({message: "Created Successfully"})
    } catch (err) {
        return res.status(500).json({err: {message: 'SERVER ERROR'}})
    }
}