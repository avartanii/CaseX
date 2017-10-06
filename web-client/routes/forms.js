var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('forms', { title: 'Input Forms', display_name: 'Data Input Forms' });
});

module.exports = router;
