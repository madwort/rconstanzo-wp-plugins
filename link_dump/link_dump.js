( function(w, $) {
  w.link_dump = function (parent) {
    var my_links = "<h2>Links</h2>";
    var my_video_links = "<h2>Video links</h2>";
    $(parent+" a").each(function (_i, l){
      // <b>The Echoplex Analysis Pages
      // </b><a href="http://www.altruistmusic.com/EDP" target="_blank">http://www.altruistmusic.com/EDP</a>
      //
      // And dump anything that is youtube.com/vimeo.com into a separate list (same formatting):
      //
      // <b>Korean Gamers: APM Demonstration
      // </b><a href="https://www.youtube.com/watch?v=YbpCLqryN-Q" target="_blank">https://www.youtube.com/watch?v=YbpCLqryN-Q</a>

      var my_html = "<div><b>" + $(this).text() +"</b>" +
        "<a href='" + $(this).attr('href') + "' target='_blank'>" 
        + $(this).attr('href') + "</a></div>";
        console.log($(this).attr('href').indexOf('youtube.com'), "youtube");
      if ($(this).attr('href').indexOf('youtube.com') > 0 || 
        $(this).attr('href').indexOf('vimeo.com') > 0) {
          my_video_links += my_html;
        } else {
          my_links += my_html;
        }
    })
    $(parent).append("<div id='my_links'>"+my_links+my_video_links+"</div>");
  };

} )( window, jQuery );
