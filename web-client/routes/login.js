var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.render('page-login', { title: 'Login', displayName: 'Login' });
});

module.exports = router;
