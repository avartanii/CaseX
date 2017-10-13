var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.render('admin', { title: 'Admin Console', displayName: 'Administrator Console' });
});

module.exports = router;
