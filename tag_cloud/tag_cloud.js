( function($) {
  function create_tag_handlers() {
    $("#tag_cloud .tag").css('line-height','2em').each(function (t) {
      // console.log($(this));
      $(this)
        .mouseenter(function (e) {
          console.log("in", e, this);
          $(this).animate({"font-size": "2em", "line-height": "1em"},300)
        })
        .mouseleave(function (e) {
          console.log("out", e, this);
          $(this).animate({"font-size": "1em", "line-height": "2em"},300)
        });
      });
  };

  $(create_tag_handlers);

} )( jQuery );
