"use strict";

// Front end JS
console.log("Loaded front end Javascript");


// Configurable options
// TODO set as changable variables
const array_size = 10;
var width = 200;
var height = 200;


var margins = {
  top: 10, bottom: 10,
  left: 5, right: 5
};
width -= margins.left - margins.right;
height -= margins.top - margins.bottom;

// Setup the SVG
var svg = d3
            .select('#quicksort')
            .append('svg')
            .attr('width', width)
            .attr('height', height)

// Setup the data
var index = d3.range(array_size);
var data_array = shuffle(index.slice());

var bars = svg
              .selectAll('rect')
              .data(data_array);

bars.enter().append('rect');


// var x = d3.scale.ordinal().domain(index).rangePoints([0, width]),
//     a = d3.scale.linear().domain([0, n - 1]).range([-Math.PI / 4, Math.PI / 4]);

// var svg = d3.select("#quicksort").append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("transform", "translate(" + margin.left + "," + (margin.top + height) + ")");

// var line = svg.selectAll("line")
//     .data(data)
//   .enter().append("line")
//     .attr("index", function(d, i) { return "i" + i; })
//     .attr("x2", function(d) { return height * Math.sin(a(d)); })
//     .attr("y2", function(d) { return -height * Math.cos(a(d)); })
//     .attr("transform", function(d, i) { return "translate(" + x(i) + ")"; });

// // TODO
// // $('js-load-report').on('click', function() {onclick(js-load-report).showLoading();

// /*
//  * Based on a JS implementation of quicksort.
//  * http://khan4019.github.io/front-end-Interview-Questions/sort.html#quickSort
//  * quickSort([11,8,14,3,6,2,7],0,6);
// */
// function quickSort(arr, left, right) {
//    var len = arr.length,
//    pivot,
//    partitionIndex;

//   if(left < right){
//     pivot = right;
//     partitionIndex = partition(arr, pivot, left, right);

//    // sort left and right
//    quickSort(arr, left, partitionIndex - 1);
//    quickSort(arr, partitionIndex + 1, right);
//   }
//   return arr;
// }


// /**
//  * Finds a new partition index for quick sort.
//  */
// function partition(arr, pivot, left, right) {
//    var pivotValue = arr[pivot],
//        partitionIndex = left;

//    for(var i = left; i < right; i++){
//     if(arr[i] < pivotValue){
//       swap(arr, i, partitionIndex);
//       partitionIndex++;
//     }
//   }
//   swap(arr, right, partitionIndex);
//   return partitionIndex;
// }

// /**
//  * Helper function to swap 2 values in an array.
//  */
// function swap(arr, i, j) {
//    var temp = arr[i];
//    arr[i] = arr[j];
//    arr[j] = temp;
// }





// var n = 960

// var z = d3.scaleSequential(d3.interpolateRainbow).domain([0, n])

// var data = d3.range(n)

// var svg = d3.select('svg')
//   .attr('width', n)
//   .attr('height', n)

// var g = svg.append('g')

// var rect = g.selectAll('rect')
//   .data(data, Number)
// .enter()
//   .append('rect')
//   .attr('width', function (d, i) { return i + 1 })
//   .attr('height', 1)
//   .attr('x', 1)
//   .attr('y', function (d, i) { return i })
//   .attr('fill', z)

// function* sort () {
//   function* recurse (left, right) {
//     if (left <= right) {
//       var l = left, r = right, mid = data[Math.floor((left + right) / 2)]
//       while (l <= r) {
//         for (; l <= right && data[l] < mid; ++l);
//         for (; r > left && data[r] > mid; --r);
//         if (l <= r) {
//           yield* swap(l++, r--)
//         }
//       }
//       yield * recurse(left, r)
//       yield * recurse(l, right)
//     }
//   }

//   function* swap (i, j) {
//     if (i === j) return
//     yield [i, j]
//     var t = data[i]
//     data[i] = data[j]
//     data[j] = t
//   }

//   yield * recurse(0, data.length - 1)
// }

// var gen = { next () { return { done: true } } }

// d3.timer(function () {
//   var v
//   while ((v = gen.next()).done) {
//     d3.shuffle(data)
//     gen = sort()
//   }
//   rect.data(data, Number)
//     .attr('y', function (d, i) { return i })

//   var line = g.selectAll('.line')
//     .data(v.value)

//   line.enter().append('rect')
//     .attr('class', 'line')
//     .attr('x', 0)
//     .attr('height', 1)
//     .attr('width', n)
//   .merge(line)
//     .attr('y', function (d, i) { return d })

//   line.exit().remove()
// })


/**
 * Shuffle an array, taken from here
 * http://codepen.io/Oooing/pen/YXwyKZ
 */
function shuffle(array) {
  var m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m], array[m] = array[i], array[i] = t;
  }
  return array;
}