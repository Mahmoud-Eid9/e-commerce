const orderController = require('../controller/order')
const paymentController = require('../controller/payment.js')
const epxress = require("express")
const router = epxress.Router()

router.route('/order')
.post(orderController.createOrder)
.get(orderController.getOrder)
.delete(orderController.deleteOrder)
.put(orderController.updateOrder)

router.route('/payment')
.post(paymentController.createPayment)
// .get(orderController.getOrder)
// .delete(orderController.deleteOrder)
// .put(orderController.updateOrder)


// router.route('/order_item')
// .post(orderController.addOrderItem)
// .get(orderController.getOrderItem)
// .delete(orderController.deleteOrderItem)


module.exports = router;