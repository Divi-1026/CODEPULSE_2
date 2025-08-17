const { createClient } = require('redis');
require('dotenv').config({ path: __dirname + '/../../.env' });

const redisClient = createClient({
  username: 'default', // optional for Redis Cloud, but safe to include
  password: process.env.REDIS_KEY,
  socket: {
    host: 'redis-15377.crce179.ap-south-1-1.ec2.redns.redis-cloud.com',
    port: 15377,
  },
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

module.exports = redisClient;
