( function($) {
  // infinite_scroll/chapter1.html
  // http://madwort.co.uk/wp-content/plugins/infinite_scroll/chapter1.html
  // http://www.rodrigoconstanzo.com/thesisfiles/chapter1.html
  $.get( "http://www.rodrigoconstanzo.com/thesisfiles/chapter1.html", function( data ) {
    $(window).scroll(function() {
    	if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
        var current_last_element =
          $("div#scroll-to-read p").filter(':last');

        current_last_element
          .append(data)
          .hide();

        // cosy up the first <p> to the end of the previous content
        current_last_element.children('p').filter(':first')
          .css('display','inline');

        current_last_element
          .delay(200)
          .fadeIn(1500);
       }
    });
  });
} )( jQuery );
