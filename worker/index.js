const keys = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
});

redisClient.on('error', () => {
  console.log('redis lost connection');
});

// const sub = redisClient.duplicate();

// function fib(nth) {
//   let a, b = 1;
//   if (nth <= 2) return 1;
//   while(nth > 2) {
//     [a, b] = [b, a + b]
//     nth--;
//   }
//   return b;
// }

function fib(nth) {
  if (nth <= 2) return 1;
  return fib(nth - 1) + fib(nth - 2);
}

// sub.on('message', (channel, message) => {
//   redisClient.hset('values', message, fib(parseInt(message)));
// });
// sub.subscribe('insert');
