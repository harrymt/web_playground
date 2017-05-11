/* jslint node: true */
"use strict";

var express = require('express');
var router = express.Router();
var sitemap = require('express-sitemap');


/* GET pages. */
router.get('/', function(req, res, next) { res.render('index', { title: 'Home'}); });
router.get('/front-end', function(req, res, next) { res.render('pages/front-end', { title: 'Front-End'}); });
router.get('/back-end', function(req, res, next) { res.render('pages/back-end', { title: 'Back-End'}); });
router.get('/report', function(req, res, next) {  res.render('pages/report', { title: 'Report'}); });

module.exports = router;

// Generate sitemap.xml
sitemap({
  sitemap: 'public/sitemap.xml', // path for .xml
  robots: 'public/robots.txt',
  http: "https",
  route: {
    'ALL': {
      lastmod: '2017-05-15',
      changefreq: 'always',
      priority: 1.0,
    }
  },
  generate: router,
}).toFile();
