(function (w, $) {
  var tag_data;
  
  function htmlEncode (value) {
    if (value) {
      return $('<div />').text(value).html();
    } else {
      return '';
    }
  }

  w.create_tag_handlers = function ($path) {
    Papa.parse($path, { 
      download: true,
      header: true,
      complete: function (data) {
        tag_data = data;
      }
    });

    $("#tag_cloud .tag").css('line-height','2em').each(function (t) {
      $(this)
        .click(function (e) {

          if (typeof tag_data === 'undefined' ) {
            $('#tag_cloud #results').html("tag_data not loaded");
            return;
          }

          var my_html = 
            "<h2>Search results for " + e.target.textContent + "</h2>" +
            "<ul>";
          var my_data = (tag_data.data.filter(function(d){
            return (d.tag == e.target.textContent);
          }));

          my_data.forEach(function(result, index) {
            my_html += "<li>...<a href='" + result.url + "'>" + htmlEncode(result.text) + "</a>...</li>";
          });;

          my_html += "</ul>";
          $('#tag_cloud #results').html(my_html);
        });
      });
  };

} )( window, jQuery );
