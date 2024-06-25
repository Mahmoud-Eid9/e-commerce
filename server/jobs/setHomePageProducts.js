// /src/jobs/myCronJobs.js
const cron = require('node-cron');
const redis = require('../config/redis');

const scheduleJobs = () => {
  // Example cron job: Run every minute
  cron.schedule('* * * * *', () => {
    console.log('Running a job every minute');
    // Add your job logic here
  });

  // Example cron job: Run at 12:00 AM every day
  cron.schedule('0 0 * * *', () => {
    console.log('Running a job at midnight');
    // Add your job logic here
  });
};

module.exports = scheduleJobs;