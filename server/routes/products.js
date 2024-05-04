const productController = require('../controller/product')
const epxress = require("express")
const router = epxress.Router()

router.route('/products')
.get(productController.getProducts)
// .post(productController.createProduct)
// .delete(productController.deleteOrder)
// .put(productController.updateOrder)



module.exports = router;