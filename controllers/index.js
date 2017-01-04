var express = require('express')
  , router = express.Router()

router.get('/', function (req, res) {
  res.send('Welcome to CompCalc!\n');
});

module.exports = router