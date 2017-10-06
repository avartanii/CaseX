var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('explorer', { title: 'Data Explorer', display_name: 'Data Explorer' });
});

module.exports = router;
