"use strict";

var assert = require('assert');

// Require front end js files
var main = require('../js/main.js');

describe('Util', function() {
  describe('doesElementExist', function() {
    it('should return true when element exists', function() {
      var element_body = { tagName: 'body' };
      assert.equal(true, main.doesElementExist(element_body));
    });
  });

  describe('getRandomNum', function() {
    it('should return a random number between the min and the max', function() {
      var max = 10;
      var possible_number = main.getRandomNum(0, max);
      for (var i = 0; i < max; i++) {
        if(i == possible_number) {
          assert.ok("Found possible number " + possible_number);
        }
      }
    });
  });
});
