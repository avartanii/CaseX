var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.render('explorer', { title: 'Data Explorer', displayName: 'Data Explorer' });
});

module.exports = router;
