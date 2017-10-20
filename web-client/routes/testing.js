var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.render('page-testing', { title: 'Testing', displayName: 'Testing Page' });
});

module.exports = router;
