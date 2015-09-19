(function (w, $) {
  'use strict';
  var my_data;

  // from http://stackoverflow.com/questions/12009367/javascript-event-handling-scroll-event-with-a-delay
  function debounce(method, delay) {
    clearTimeout(method._tId);
    method._tId= setTimeout(function(){
        method();
    }, delay);
  }

  function handle_scroll() {
    var all_elements = $('body').find('*');
    var random_element_id = Math.floor(all_elements.length*Math.random());
    var random_element = $(all_elements[random_element_id]);
    if(
      !(random_element.hasClass('wp-image-2616')) 
      &&
      !(random_element.hasClass('colLeft')) 
      &&
      !(random_element.hasClass('content')) 
    ) {
      random_element.replaceWith("<p>The process</p>");
    }
  }

  w.destruction = function () {
    $(w).scroll(function() {
        debounce(handle_scroll, 75);
    });
    
  }

} )( window, jQuery );
