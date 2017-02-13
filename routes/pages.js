var express = require('express');
var router = express.Router();

/* GET pages. */
router.get('/', function(req, res, next) { res.render('index', { title: 'Home'}); });
router.get('/front-end', function(req, res, next) { res.render('pages/front-end', { title: 'Front-End'}); });
router.get('/back-end', function(req, res, next) { res.render('pages/back-end', { title: 'Back-End'}); });
router.get('/report', function(req, res, next) {  res.render('pages/report', { title: 'Report'}); });
router.get('/extras', function(req, res, next) {  res.render('pages/extras', { title: 'Extras'}); });

module.exports = router;
