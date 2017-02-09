var express = require('express');
var router = express.Router();

/* Render, then GET report as PDF. */
router.get('/report/pdf', function(req, res, next) {
  var markdownpdf = require("markdown-pdf"), fs = require("fs")

  console.log("Trying to render report.");

  markdownpdf().from("report.md").to("report.pdf", function () {
    console.log("Successfully rendered report.");

    fs.readFile("report.pdf", function(err, data) {
        res.contentType("application/pdf");
        res.send(data);
    });
  });
});

module.exports = router;
