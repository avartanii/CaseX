var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.render('page-input', { title: 'Input Data', displayName: 'Input Case Data' });
});

module.exports = router;
