( function($) {
  function create_tag_handlers() {
    $("#tag_cloud .tag").css('line-height','2em').each(function (t) {
      // console.log($(this));
      $(this)
        .mouseenter(function (e) {
          // console.log("in", e, this);
          $(this).animate({"font-size": "2em", "line-height": "1em"},300);
        })
        .mouseleave(function (e) {
          // console.log("out", e, this);
          $(this).animate({"font-size": "1em", "line-height": "2em"},300);
        })
        .click(function (e) {
          console.log("click", e, this);
          $('#tag_cloud #popup').remove();
          $('#tag_cloud').append("<div id='popup' "+
            "style='position: fixed; top: " + (e.pageY + 20) + 
            "px; left: " + (e.pageX + 20) + "px;'>"+
            "BLAH BLAH BLAH "+$(this).text()+"</div>"
          );
        });
      });
  };

  $(create_tag_handlers);

} )( jQuery );
