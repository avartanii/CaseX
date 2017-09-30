var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('ind-case', { title: 'Individual Case File' });
});

module.exports = router;
