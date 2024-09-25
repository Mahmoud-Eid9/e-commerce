const { getLatestProducts } = require('../products');
const redis = require('../../config/redis');

exports.storeLatestProducts = () => {
    return new Promise(async (res, rej) => {
        try {
            const products = await getLatestProducts();
            const jsonString = JSON.stringify(products);
            await redis.set('latestProducts', jsonString);
            res(jsonString)
        } catch (error) {
            rej(error);
        }

    })
}



exports.getLatestProducts = () => {
    return new Promise(async (res, rej) => {
        try {
            // Get JSON string from Redis
            const jsonString = await redis.get('latestProducts');
            // Parse JSON string into JavaScript objects
            const objects = JSON.parse(jsonString);
            res(objects);
        } catch (error) {
            console.error('Error retrieving objects:', error);
            rej(error);
        }
    });
}