var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home'});
});

router.get('/html', function(req, res, next) { res.render('pages/page_html', { title: 'HTML'}); });
router.get('/css', function(req, res, next) {  res.render('pages/page_css', { title: 'CSS'}); });
router.get('/js', function(req, res, next) { res.render('pages/page_js', { title: 'JS'}); });
router.get('/png', function(req, res, next) {  res.render('pages/page_png', { title: 'PNG'}); });
router.get('/svg', function(req, res, next) { res.render('pages/page_svg', { title: 'SVG'}); });
router.get('/server', function(req, res, next) {  res.render('pages/page_server', { title: 'Server'}); });
router.get('/database', function(req, res, next) { res.render('pages/page_database', { title: 'Database'}); });
router.get('/dynamic', function(req, res, next) {  res.render('pages/page_dynamic', { title: 'Dynamic'}); });
router.get('/report', function(req, res, next) {  res.render('pages/page_report', { title: 'Report'}); });
router.get('/extras', function(req, res, next) {  res.render('pages/page_extras', { title: 'Extras'}); });

module.exports = router;
