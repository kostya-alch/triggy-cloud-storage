const express = require('express');
const mongoose = require('mongoose');
const config = require('config'); // подключили все зависимости
const authRouter = require('./routes/auth.router');
const app = express();
const PORT = config.get('serverPort');
const corsMiddleware = require('./middleware/cors.middleware');

app.use(corsMiddleware);
app.use(express.json());
app.use('/api/auth', authRouter);

const start = async () => {
  try {
    mongoose.connect(config.get('dbUrl'));
    app.listen(PORT, () => {
      console.log(`server ready on ${PORT}`);
    });
  } catch (error) {}
}; // коннект к базе данных

start();
