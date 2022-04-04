import express from 'express';
import {preprocessing} from "../preprocessing/index.mjs";
export const cleanRouter = express.Router();

/* GET home page. */
cleanRouter.get('/', function(req, res, next) {
  res.render('clean', {title: 'Text Mining', limit: -1});
});

cleanRouter.post('/', function (req, res, next){
  res.render('clean', {title: 'Text Mining', limit: req.body.number, data: preprocessing(req.body.text, parseInt(req.body.number))});
})