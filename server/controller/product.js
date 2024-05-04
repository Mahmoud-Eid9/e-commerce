const Product = require('../db/products')

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.getProducts()
        res.status(200).json({products: products})
    } catch (err) {
        return res.status(500).json({err: {message: 'Get Products Server Error'}})
    }
}
