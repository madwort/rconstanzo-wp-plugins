( function($) {
  // infinite_scroll/chapter1.html
  // http://madwort.co.uk/wp-content/plugins/infinite_scroll/chapter1.html
  // http://www.rodrigoconstanzo.com/wp-content/plugins/infinite_scroll/chapter1.html
  $.get( "infinite_scroll/chapter1.html", function( data ) {
    $(window).scroll(function() {
    	if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
        $("div#scroll-to-read p")
          .filter(':last')
          .append(data)
          .hide()
          .fadeIn("slow");
       }
    });
  });
} )( jQuery );
