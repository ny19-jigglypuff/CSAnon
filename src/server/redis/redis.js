const redis = require('redis');
const redisClient = redis.createClient();

 // logs when connnected
 redisClient.on('ready', () => console.log('redis server ready'));

 // logs in case of error
 redisClient.on('error', (error) => console.error('redis server error:', error));

 // logs close event
 redisClient.on('end', () => console.log('redis server connection closed'));

 // TODO: implement set for a signed in user

 // TODO: implement get check against signed in users

 // TODO: implement removal of user from redis on user disconnect

module.exports = redisClient;
