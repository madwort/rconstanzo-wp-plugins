( function($) {
  function search_tag() {
    var params = window.location.search.split('&');
    var search_term = params[0].replace('?search=','');
    var search_id = parseInt(params[1].replace('result=','')) - 1;

    var results = $('p').filter(':contains(' + search_term + ')');
    var target = $(results[search_id]).offset().top;
    console.log('scroll to', search_term, search_id, target);
    $('body').scrollTop(target);
    console.log('scrolled');
  };

  $(search_tag);

} )( jQuery );
