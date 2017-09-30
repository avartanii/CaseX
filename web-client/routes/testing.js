var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('testing', { title: 'Testing', display_name: 'Testing Page' });
});

module.exports = router;
