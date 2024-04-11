const orderController = require('../controller/cart')
const epxress = require("express")
const router = epxress.Router()

router.route('/cart')
.post(orderController.addToCart)
.get(orderController.getCart)
.delete(orderController.deleteCartItem)


module.exports = router;