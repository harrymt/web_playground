
//
// main.js
//
(function() {
  "use strict";

  // var util = require('util.js'); // TODO change front end js things to not be combined?
  // TODO look into other front end projects to see how they did it

  // Animation variables
  var WIDTH = 200;
  var HEIGHT = 200;
  var buildingsY = 0;
  var rain_size = 20;
  var blueSquares = [];
  var droplets = (WIDTH / (rain_size + 5));

  function draw(canvas) {
      canvas.width = WIDTH; canvas.height = HEIGHT;
      var context = canvas.getContext("2d");
      // Setup shadow
      context.shadowColor = "rgba(0, 0, 0, 0.3)";
      context.shadowBlur = 20;
      context.shadowOffsetX = 10;
      context.shadowOffsetY = 10;

      for(var i = 0; i < droplets; i++) {
        blueSquares.push(utils.getRandomNum(0, 100));
      }

      return context;
  }

  function moveCubes(context) {
    buildingsY++; if(buildingsY > (WIDTH * 2)) { buildingsY = -WIDTH; }
    for(var i = 0; i < droplets; i++) {
      blueSquares[i]++;
      if(blueSquares[i] > HEIGHT) { blueSquares[i] = 0; }
    }
  }

  function update(context) {
      context.clearRect(0, 0, WIDTH, HEIGHT);

      moveCubes(context);

      // Draw buildings
      context.fillStyle = "#ddd";
      var big_size = 40;
      var small_size = 20;
      context.fillRect(buildingsY + 90, HEIGHT - small_size, 20, small_size);
      context.fillRect(buildingsY + 50, HEIGHT - small_size, 20, small_size);
      context.fillRect(buildingsY, HEIGHT - big_size, 20, big_size);
      context.fillRect(buildingsY - 40, HEIGHT - big_size, 20, big_size);
      context.fillRect(buildingsY - 80, HEIGHT - small_size, 20, small_size);
      context.fillRect(buildingsY - 150, HEIGHT - big_size, 20, big_size);
      context.fillRect(buildingsY - 200, HEIGHT - small_size, 20, small_size);

      // Draw rain
      context.fillStyle = "rgba(0, 0, 50, 0.5)";
      var x = 0;
      for(var y = 0; y < droplets; y++) {
        context.beginPath();
        context.fillRect(x, y + blueSquares[y], rain_size, rain_size);
        x += rain_size + 10;
      }
  }






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
        console.log("Error unable to count number of hits.")
      }
    });
  }

  if (typeof window != "undefined") {
    window.onload = function() {
      handleHits();

      var canvas = document.getElementById("png-example");
      if(doesElementExist(canvas)) {
        var context = draw(canvas);
        setInterval(function() { update(context); }, 20);
      }
    }
  }

  /**
   * Generate a random number between the min and the max.
   */
  function getRandomNum(min, max) {
    return Math.round(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Checks if the given element object exists.
   */
  function doesElementExist(el) {
    return (typeof(el) != 'undefined' && el != null);
  }


  // /**
  //  * Generate a random number between the min and the max.
  //  */
  // exports.getRandomNum = function(min, max) {
  //   return Math.round(Math.random() * (max - min + 1)) + min;
  // };

  // /**
  //  * Checks if the given element object exists.
  //  */
  // exports.doesElementExist = function(el) {
  //   return (typeof(el) != 'undefined' && el != null);
  // };


})();
