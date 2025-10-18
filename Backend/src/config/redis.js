const { createClient } = require('redis');
require('dotenv').config({ path: __dirname + '/../../.env' });

const redisClient = createClient({
  username: 'default', // optional for Redis Cloud, but safe to include
  password: process.env.REDIS_PASS,
   socket: {
        host: 'redis-16658.crce217.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 16658
    },
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

module.exports = redisClient;
