'use strict';
require('dotenv').config();
const mongoose = require('mongoose');

// Constants
const APP_PORT = process.env.APP_PORT;
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;

var connectToDB = function() {
  var conn = mongoose.connect('mongodb://'+DB_USER+':'+DB_PASS+'@'+DB_HOST+':'+DB_PORT+'/'+DB_NAME);
  console.log('connected to db')
  return conn;
}

var disconnectFromDB = function() {
  mongoose.connection.close()
  console.log('disconnected from db')
}

module.exports = {
    connectToDB: connectToDB,
    disconnectFromDB: disconnectFromDB
}