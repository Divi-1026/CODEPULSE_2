const { createClient } = require('redis');
require('dotenv').config({ path: __dirname + '/../../.env' });

const redisClient = createClient({
  username: 'default', // optional for Redis Cloud, but safe to include
  password: process.env.REDIS_PASS,
   socket: {
         host: 'redis-15157.c273.us-east-1-2.ec2.cloud.redislabs.com',
        port: 15157
    },
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

module.exports = redisClient;
// const { createClient } = require('redis');
// require('dotenv').config({ path: __dirname + '/../../.env' });
// const client = createClient({
//     username: 'default',
//     password: '4rSx48fFS24pfjbuiM29UL0fegeNUBtK',
//     socket: {
//         host: 'redis-15157.c273.us-east-1-2.ec2.cloud.redislabs.com',
//         port: 15157
//     }
// });

// client.on('error', err => console.log('Redis Client Error', err));

// await client.connect();

// await client.set('foo', 'bar');
// const result = await client.get('foo');
// console.log(result)  // >>> bar

