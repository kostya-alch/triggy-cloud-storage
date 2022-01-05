const express = require('express');
const mongoose = require('mongoose');
const config = require('config'); // подключили все зависимости
const authRouter = require('./routes/auth.router');
const fileRouter = require('./routes/file.router');
const fileUploader = require('express-fileupload');
const app = express();
const PORT = config.get('serverPort');
const corsMiddleware = require('./middleware/cors.middleware');

app.use(fileUploader({}));
app.use(corsMiddleware);
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/files', fileRouter);

const start = async () => {
  try {
    await mongoose.connect(config.get('dbUrl'));

    app.listen(PORT, () => {
      console.log(`server ready on ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}; // коннект к базе данных

start();
