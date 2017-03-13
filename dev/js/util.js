"use strict";

// TODO NOT IMPLEMENTED


// Util module
(function() {

  /**
   * Generate a random number between the min and the max.
   */
  exports.getRandomNum = function(min, max) {
    return Math.round(Math.random() * (max - min + 1)) + min;
  };

  /**
   * Checks if the given element object exists.
   */
  exports.doesElementExist = function(el) {
    return (typeof(el) != 'undefined' && el != null);
  };

});
