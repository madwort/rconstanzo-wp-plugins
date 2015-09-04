( function($) {
  // infinite_scroll/chapter1.html
  // http://madwort.co.uk/wp-content/plugins/infinite_scroll/chapter1.html
  // http://www.rodrigoconstanzo.com/thesisfiles/chapter1.html
  $.get( "http://madwort.co.uk/wp-content/plugins/infinite_scroll/chapter1.html", function( data ) {
    $(window).scroll(function() {
    	if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
        $("div#scroll-to-read p")
          .filter(':last')
          .append(data)
          .hide()
          .delay(100)
          .fadeIn(1000);
       }
    });
  });
} )( jQuery );
