// Written by John Thomas 
// @hashtagJohnT
//
//
//////////////////////////////////////////////////
// The MIT License (MIT)

// Copyright (c) 2015 John Thomas

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
//////////////////////////////////////////////////

var bwtwSticky = (function() {
  var object = {};

  function init(id, classNames, offset) {
  	// console.log("INIT HIT: " + id + " " + offset);
  	object.html = document.getElementById(id);
  	object.offset = offset || getYOffset(object.html);

  	object.originalClasses = object.html.className;
  	object.allClasses = object.originalClasses + " " + classNames;
  	object.stuck = object.stuck || false;

  	// Add scroll and resize event listener
    window.addEventListener('scroll', bwtwSticky.stickyNavScroll, false);
    window.addEventListener('resize', bwtwSticky.resize, false);

  }

  function stickyNavScroll() {

    // console.log("Scrolled: ");
    if (window.scrollY >= object.offset && object.stuck == false) {
  		object.html.className = object.allClasses;
  		object.stuck = true;
    }

    if (window.scrollY < object.offset && object.stuck == true) {
      object.html.className = object.originalClasses;
      object.stuck = false;
    }


  }

  function getYOffset(element) {

    var yPosition = 0;
    while(element) {
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }

    return yPosition;
  }

  function resize() {
  	// console.log("resize hit");
  	object.offset = getYOffset(object.html);
  }


  //// PUBLIC METHODS
  return {
    init: function(id, classNames, offset) {
      return init(id, classNames,  offset);
    },
    stickyNavScroll: function() {
      return stickyNavScroll();
    },
    resize: function() {
    	return resize();
    }
  }

})();