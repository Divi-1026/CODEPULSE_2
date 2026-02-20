// const { createClient } = require('redis');
// require('dotenv').config({ path: __dirname + '/../../.env' });

// const redisClient = createClient({
//   username: 'default', // optional for Redis Cloud, but safe to include
//   password: process.env.REDIS_PASS,
//    socket: {
//         host: 'redis-16658.crce217.ap-south-1-1.ec2.redns.redis-cloud.com',
//         port: 16658
//     },
// });

// redisClient.on('error', (err) => console.error('Redis Client Error', err));

// module.exports = redisClient;

const { createClient } = require('redis');
require('dotenv').config({ path: __dirname + '/../../.env' });

const redisClient = createClient({
  username: 'default',
  password: process.env.REDIS_PASS,
  socket: {
    host: 'redis-15157.c273.us-east-1-2.ec2.cloud.redislabs.com',
    port: 15157,
    tls: true
  }
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

async function connectRedis() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log("Redis Connected");
  }
}

connectRedis();

module.exports = redisClient;
