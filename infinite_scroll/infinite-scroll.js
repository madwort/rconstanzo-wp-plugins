( function(w, d, $) {
  var my_data;

  // from http://stackoverflow.com/questions/12009367/javascript-event-handling-scroll-event-with-a-delay
  function debounce(method, delay) {
      clearTimeout(method._tId);
      method._tId= setTimeout(function(){
          method();
      }, delay);
  }

  function handle_scroll() {
    if($(w).scrollTop() + $(w).height() > $(d).height() - 100) {
      var current_last_element =
        $("div#scroll-to-read p").filter(':last');
      current_last_element
        .append(my_data)
        .hide();

      // cosy up the first <p> to the end of the previous content
      current_last_element.children('p').filter(':first')
        .css('display','inline');

      current_last_element
        .fadeIn(1500);
     }
  }

  // infinite_scroll/chapter1.html
  // http://madwort.co.uk/wp-content/plugins/infinite_scroll/chapter1.html
  // http://www.rodrigoconstanzo.com/thesisfiles/chapter1.html
  $.get( "http://www.rodrigoconstanzo.com/thesisfiles/chapter1.html", function( data ) {
    $(w).scroll(function() {
      my_data = data;
      debounce(handle_scroll, 200);
    });
  });

} )( window, document, jQuery );
