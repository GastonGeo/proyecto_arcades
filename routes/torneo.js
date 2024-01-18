const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('torneo', { title: 'Torneo Arcade House' });
});

module.exports = router;
