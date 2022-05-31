var express = require('express');
var router = express.Router();
var terms = require('../database/terms');

/* GET home page. */
router.get('/', function(req, res, next) {
  terms.selectKBest(req.query.label, req.query.limit, req.query.metric, req.query.operation, req.query.typeOfGram).then(terms => res.render('terms', { title: 'Terms', label: req.query.label, limit: req.query.limit, metric: req.query.metric, operation: req.query.operation, typeOfGram: req.query.typeOfGram, data: terms}));
});

module.exports = router;