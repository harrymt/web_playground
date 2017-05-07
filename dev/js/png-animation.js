
//
// PNG animation
//
(function() {
    "use strict";

    // Animation variables
    var WIDTH = 200;
    var HEIGHT = 200;
    var buildingsY = 0;
    var rain_size = 20;
    var blueSquares = [];
    var droplets = (WIDTH / (rain_size + 5));

    /**
     * Draw the animation.
     */
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

    /**
     * Move the cubes array.
     */
    function moveCubes(context) {
        buildingsY++; if(buildingsY > (WIDTH * 2)) { buildingsY = -WIDTH; }
        for(var i = 0; i < droplets; i++) {
            blueSquares[i]++;
            if(blueSquares[i] > HEIGHT) { blueSquares[i] = 0; }
        }
    }

    /**
     * Animate the scene.
     */
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


    /**
     * Start animation if the animation exists on the page.
     */
    $(document).ready(function() {
        var canvas = document.getElementById("png-example");
        if(utils.doesElementExist(canvas)) {
            var context = draw(canvas);
            setInterval(function() { update(context); }, 20);
        }
    });

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

})();
