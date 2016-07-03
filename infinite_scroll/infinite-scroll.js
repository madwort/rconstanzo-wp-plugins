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
        $("div#scroll-to-read span").filter(':last');
      current_last_element
        .after("<span class='scrollText2' style='display: none;'>" + 
                 $("div#scroll-to-read")[0].dataset.scrollText2 + 
               "</span>" +
               "<div class='scrollText' style='display: none;'>" + my_data + "</div>" +
               "<span>" + $("div#scroll-to-read")[0].dataset.scrollText + "</span>");

       $('div.scrollText, span.scrollText2').fadeIn(2500);
     }
  }

  w.initialise_infinite_scroll = function () {
    // infinite_scroll/chapter1.html
    // http://madwort.co.uk/wp-content/plugins/infinite_scroll/chapter1.html
    // http://www.rodrigoconstanzo.com/thesisfiles/chapter1.html
    // $.get( "infinite_scroll/chapter1.html", function( data ) {
    $.get( $('a.infinite_scroll_url').first().attr('href'), function( data ) {
      $(w).scroll(function() {
        my_data = data;
        debounce(handle_scroll, 200);
      });
    }, 'html');
  }

} )( window, document, jQuery );
