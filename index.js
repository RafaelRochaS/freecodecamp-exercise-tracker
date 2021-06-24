const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const dotenv = require('dotenv').config();
const routes = require('./routes');

const DB_STRING = process.env.DB_STRING || '';
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

mongoose
  .connect(DB_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {

    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors());
    app.use('/api/', routes);

    app.listen(PORT, () => {
      console.log(`Server listening at ${PORT}`)
    });
  });
