
/**
 * Utility functions.
 */
var utils = {

  /**
   * Generate a random number between the min and the max.
   */
  getRandomNum : function(min, max) {
    return Math.round(Math.random() * (max - min + 1)) + min;
  },

  /**
   * Checks if the given element object exists.
   */
  doesElementExist : function(el) {
    return (typeof(el) != 'undefined' && el !== null);
  }
};
