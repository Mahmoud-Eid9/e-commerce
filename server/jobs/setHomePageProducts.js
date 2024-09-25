// /src/jobs/myCronJobs.js
const cron = require('node-cron');
const redis = require('../config/redis');
const { storeBestSellingProducts } = require('../db/redis/bestSelling');
const { getLatestProducts } = require('../db/redis/latestProducts');

const scheduleJobs = () => {
  // Example cron job: Run every minute
  cron.schedule('0 0 */3 * *', async () => {
    console.log('Running scheduled job to refresh products');
    await storeBestSellingProducts();
    await getLatestProducts();
  });

  // Example cron job: Run at 12:00 AM every day
  cron.schedule('0 0 * * *', () => {
    console.log('Running a job at midnight');
    // Add your job logic here
  });
};




module.exports = scheduleJobs;