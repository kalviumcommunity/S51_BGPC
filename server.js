const express = require('express');
require('dotenv').config();
const { startDB, stopDB, isConnected } = require('./db.js');
const app = express();
const route = require('./router/routes.js');
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(express.json());
app.use('/', route);
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.get('/', (req, res) => {
  res.send(isConnected() ? 'Connected' : 'Disconnected');
});

app.get('/ping', (req, res) => {
  res.send('PONG');
});

if (require.main == module) {
  app.listen(3000, async () => {
    await startDB();
    console.log('Server is running on port 3000');
  });
}
