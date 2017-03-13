// TODO "use strict";

(function() {
  /**
   * Middleware to handle content negotiation.
   * If Accept header == application/xhtml+xml (where no "q" param or "q=1" 1+) then xhtml
   * If Accept header == text/html (where no "q" param or "q=1" 1+) or == *\* (slash other way) then html
   */
  module.exports.handleContent = function(req, res, next) {
    var header_type = req.headers['accept'];

    if(header_type == undefined) {
      // Trigger error.
      res.status(406);
      next(setUnacceptableRequest());
      return;
    }

    header_type = header_type.toString().replace(" ", "").split(",");

    if (findNeedleInHaystack(header_type, "text/html") || findNeedleInHaystack(header_type, "*/*")) {
      // Serve HTML
      console.log("Can handle HTML");
      next();
    } else if(findNeedleInHaystack(header_type, "image/*")) {
      // Serve an image
      console.log("Can handle images");
      next();
    } else if(findNeedleInHaystack(header_type, "application/xhtml+xml")) {
      // Serve XHTML
      console.log("Can handle XHTML");
      next();
    } else {
      // Trigger error.
      res.status(406);
      next(setUnacceptableRequest(header_type));
    }
  }

  function setUnacceptableRequest(header) {
      var err = new Error('Unacceptable request detected!');
      err.status = 406;
      console.log("Unacceptable request detected");
      console.log(header);
      return err;
  }

  function findNeedleInHaystack(haystack, needle) {
    if(needle === undefined) { return false; }
    for (var i = haystack.length - 1; i >= 0; i--) {
      if(needle === haystack[i]) {
        return true;
      }
    }
    return false;
  }




}());

