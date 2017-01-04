'use strict';

const express = require('express');

// Constants
const PORT = 8080;

// App
const app = express();
app.use(require('./controllers'))

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);