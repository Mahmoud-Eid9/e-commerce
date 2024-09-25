const { getBestSellingProducts } = require('../products');
const redis = require('../../config/redis');

exports.storeBestSellingProducts = () => {
    return new Promise(async (res, rej) => {
        try {
            const products = await getBestSellingProducts();
            const jsonString = JSON.stringify(products);
            await redis.set('bestSelling', jsonString);
            res(jsonString)
        } catch (error) {
            rej(error)
        }

    })
}



exports.retrieveObjects = () => {
    return new Promise(async (res, rej) => {
        try {
            // Get JSON string from Redis
            const jsonString = await redis.get('bestSelling');

            // Parse JSON string into JavaScript objects
            const objects = JSON.parse(jsonString);
            res(objects);
        } catch (error) {
            console.error('Error retrieving objects:', error);
            rej(error);
        }
    });
}