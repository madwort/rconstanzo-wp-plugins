( function(w, d, $) {
  function show_rod_number(j) {
    for (var i = 1; i < 9; i++) {
      $('#scroll-z-plane #rod'+i).hide();
      if (j == i) {
        $('#scroll-z-plane #rod'+i).show();
      }
    }

  }

	$(w).scroll(function() {
    // adjust this parameter for how quickly to switch between
    // images as you scroll (eg. change images every 50px?)
    var scroll_diff = 50;
    var pos = Math.floor($(d).scrollTop()/scroll_diff)+1;
    if (pos > 8) {
      pos = 8;
    }
    if (pos < 1) {
      pos = 1;
    }
    show_rod_number(pos);
	});
} )( window, document, jQuery );
