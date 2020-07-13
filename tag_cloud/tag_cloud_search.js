( function(w, $) {
  w.search_tag = function () {
    if (window.location.hash == '') {
      // console.log("empty hash");
      return;
    }
    var params = window.location.hash.split(',');
    var search_term = params[0].replace('#','');
    var search_id = parseInt(params[1]) - 1;
    var result = $('p').filter(':contains(' + search_term + ')')
                  .filter(function(index) {return index === search_id; });

    var target = $(result).offset().top;
    console.log(target);
    // console.log('scroll to', search_term, search_id, target);
    // $('body').scrollTop(target);
    $('body,html').stop(true,true).animate({scrollTop: target}, 10);
    // console.log('scrolled');
  };

} )( window, jQuery );
