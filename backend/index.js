const express = require('express');
const mongoose = require('mongoose');
const config = require('config'); // подключили все зависимости

const app = express();
const PORT = config.get('serverPort');

const start = async () => { 
  try {
    mongoose.connect(config.get('dbUrl'));
    app.listen(PORT, () => {
      console.log(`server ready on ${PORT}`);
    });
  } catch (error) {}
}; // коннект к базе данных

start();
