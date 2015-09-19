( function(w, $) {
  w.search_tag = function () {
    var params = window.location.hash.split(',');
    var search_term = params[0].replace('#','');
    var search_id = parseInt(params[1]) - 1;

    var results = $('p').filter(':contains(' + search_term + ')');
    var target = $(results[search_id]).offset().top;
    // console.log('scroll to', search_term, search_id, target);
    $('body').scrollTop(target);
    // console.log('scrolled');
  };

} )( window, jQuery );
