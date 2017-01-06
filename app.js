'use strict';
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

// Constants
const APP_PORT = process.env.APP_PORT;
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;

// App
const app = express();
app.use(require('./controllers'))

app.listen(APP_PORT);
console.log('Running on http://localhost:' + APP_PORT);

// Database
mongoose.connect('mongodb://'+DB_USER+':'+DB_PASS+'@'+DB_HOST+':'+DB_PORT+'/'+DB_NAME);