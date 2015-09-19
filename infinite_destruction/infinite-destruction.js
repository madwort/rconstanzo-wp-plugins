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

  function remove_random_element(elements) {
    var random_element_id = Math.floor(elements.length*Math.random());
    var random_element = $(elements[random_element_id]);
    var max_font_size = 5;
    if (random_element.is('a')) {
      // implies li.menu-item > a
      max_font_size = 2;
    };
    var font_size = Math.floor(1+(Math.random()*max_font_size));
    random_element
      .replaceWith("<p style='font-size: " + font_size + 
                   "em; margin: 0;' class='theprocess'>The process</p>");
  }

  function handle_scroll() {
    // Phase 1: text, navbar, widgets
    // * div#colLeft > p
    //  * apart from div.colLeft > p > img !!!
    //  * done with :last-child
    // * li.menu-item > a
    // * div.rightBox > ul > li
    // * div.rightBox > div.textwidget

    var my_elements = 
      $('div#colLeft > p').not('.theprocess').not(':last-child');

    var new_elements = $('li.menu-item > a');
    my_elements = $.merge(my_elements, new_elements)

    new_elements = $('div.rightBox > ul > li');
    my_elements = $.merge(my_elements, new_elements)

    new_elements = $('div.rightBox > div.textwidget');
    my_elements = $.merge(my_elements, new_elements)

    if (my_elements.length > 0) {
      remove_random_element(my_elements);
      return;
    }

    // We have wiped out all the elements from Phase 1. Begin Phase 2.
    // Phase 2: divs apart from #colLeft, #colRight & #content
    my_elements = $('div').not('#colLeft').not('#colRight').not('#content');
    remove_random_element(my_elements);

  }

  w.destruction = function () {
    $(w).scroll(function() {
        debounce(handle_scroll, 75);
    });
    
  }

} )( window, jQuery );
