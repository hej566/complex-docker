const keys = require('./keys');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const redis = require('redis');
const { Client } = require('pg');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const pgClient = new Client({
  user: keys.pgUser,
  host: keys.pgHost,
  port: keys.pgPort,
  database: keys.pgDatabase,
  password: keys.pgPassword,
});

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
});

pgClient.connect();

pgClient.on('error', () => {
  console.log('postgres lost connection');
});

redisClient.on('error', () => {
  console.log('redis lost connection');
});

pgClient
  .query('CREATE TABLE IF NOT EXISTS values (number INT)')
  .catch((err) => console.log(err));

app.get('/api/values/all', async (req, res) => {
  console.log('hello');
  const values = await pgClient.query('SELECT * FROM values');
  res.send(values.rows);
});

app.get('/api/values/current', async (req, res) => {
  console.log('hello');
  redisClient.hgetall('values', (err, values) => {
    if (values) res.send(values.rows);
    else res.send([]);
  });
});

app.post('/api/values', async (req, res) => {
  const nth = req.body.nth;
  if (nth > 40) {
    return res.status(422).send('nth is too high');
  }
  redisClient.hset(values, nth, 'Nothing yet');
  redisPub.publish('insert', nth);
  pgClient.query('INSERT INTO values (number) VALUES ($1)', [nth]);

  res.send({ working: true });
});

app.listen(5000, (err) => {
  console.log(err);
});
