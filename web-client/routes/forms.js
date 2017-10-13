var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.render('forms', { title: 'Input Forms', displayName: 'Data Input Forms' });
});

module.exports = router;
