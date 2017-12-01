const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('page-home', { title: 'Home', displayName: 'Home Dashboard' });
});

module.exports = router;
