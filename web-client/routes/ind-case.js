var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('ind-case', { title: 'Case Info', display_name: 'Individual Case Information' });
});

module.exports = router;
