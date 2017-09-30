var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin', { title: 'Admin Console', display_name: 'Administrator Console' });
});

module.exports = router;
