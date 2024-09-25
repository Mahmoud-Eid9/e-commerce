const productController = require('../controller/product')
const epxress = require("express")
const router = epxress.Router()

router.route('/products')
.get(productController.getProducts);
// .post(productController.createProduct)
// .delete(productController.deleteOrder)
// .put(productController.updateOrder)

router.route(`/products/:page`)
.get(productController.getProductPage);

router.route('/best_selling')
.get(productController.getBestSelling);

router.route('/latest_products')
.get(productController.getLatestProducts);


module.exports = router;