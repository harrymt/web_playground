
//
// main.js
//
(function() {
  "use strict";

  // Enable syntax highlighting
  if(hljs !== undefined && hljs !== null) {
    hljs.initHighlightingOnLoad();
  }


  $(document).ready(function() {
    handleHits();
  });

  /**
   * Make a hit and load the current hits.
   */
  function handleHits() {

    /**
     * Load the number of hits.
     */
    var getHits = $.getJSON("/hits", function( data ) {
      $(".js-hits").text(data);
    });

    /**
     * Track a hit
     */
    $.post("/hit", function( data ) {
      if(!data) {
        console.log("Error unable to count number of hits.");
      }
    });
  }
})();
