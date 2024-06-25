const keys = require('./keys');
const Redis = require('ioredis');

const redis = new Redis(keys.redisPort, keys.redisHost);

module.exports = redis;
