var bwtwSticky = (function() {
	var object = {};

	function init(id, classNames, offset) {
		console.log("INIT HIT: " + id + " " + offset);
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
		console.log("resize hit");
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