var express = require('express');
var router = express.Router();
var corpus = require('../database/corpus');

/* GET home page. */
router.get('/:id', function(req, res, next) {
    corpus.getDocument(req.params.id).then(doc => res.render('document', {title: 'Hotel Reviews', data: doc}));
});

module.exports = router;