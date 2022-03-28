var express = require('express');
var router = express.Router();
var corpus = require('../database/corpus');

/* GET home page. */
router.get('/', function(req, res, next) {
  corpus.getDocuments(req.query.label, req.query.limit).then(docs => res.render('index', { title: 'Hotel Reviews', label: req.query.label, limit: req.query.limit, data: docs}));
});

module.exports = router;