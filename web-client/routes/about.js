var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.render('page-about', { title: 'About CaseX', displayName: 'About' });
});

module.exports = router;
