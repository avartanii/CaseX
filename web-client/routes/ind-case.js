var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.render('page-case', { title: 'Case Info', displayName: 'Individual Case Information' });
});

module.exports = router;
