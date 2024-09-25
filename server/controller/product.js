const Product = require('../db/products');
const { retrieveObjects } = require("../db/redis/bestSelling");
const { getLatestProducts } = require("../db/redis/latestProducts");


exports.getProducts = async (req, res) => {
    try {
        const products = await Product.getProducts()
        res.status(200).json({ products: products })
    } catch (err) {
        return res.status(500).json({ err: { message: 'Get Products Server Error' } })
    }
}

exports.getProductPage = async (req, res) => {
    try {
        const products = await Product.getProductsPage();
    } catch (error) {
        
    }
}

exports.getBestSelling = async (req, res) => {
    try {
        const products = await retrieveObjects();
        res.status(200).json({ products: products });
    } catch (error) {
        const products = await Product.getBestSellingProducts();
        res.status(200).json({ products: products });
    }
}


exports.getLatestProducts = async (req, res) => {
    try {
        const products = await getLatestProducts();
        res.status(200).json({ products: products })
    } catch (error) {
        const products = await Product.getLatestProducts();
        res.status(200).json({ products: products });
    }
}
