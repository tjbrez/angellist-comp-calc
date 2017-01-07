'use strict';
const express = require('express');
const db = require('./db');

// Constants
const APP_PORT = process.env.APP_PORT;

// App
const app = express();
app.use(require('./controllers'))

app.listen(APP_PORT);
console.log('Running on http://localhost:' + APP_PORT);

// Connect to database
db.connectToDB();
