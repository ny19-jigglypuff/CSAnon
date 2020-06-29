const redis = require('redis');
const redisClient = redis.createClient();

redisClient.on('ready', () => console.log('redis server ready'));

redisClient.on('error', (error) => console.error('redis server error:', error));

redisClient.on('end', () => console.log('redis server connection closed'));

module.exports = redisClient;
