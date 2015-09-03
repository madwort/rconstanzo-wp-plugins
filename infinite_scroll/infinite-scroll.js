( function($) {
  $(window).scroll(function() {
  	if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
      $("div#scroll-to-read p")
        .filter(':last')
        .insertAfter('p')
        .load('http://madwort.co.uk/wp-content/plugins/infinite_scroll/chapter1.html')
        .hide()
        .fadeIn("slow");
     }
  });
} )( jQuery );
