( function($) {
  function create_tag_handlers() {
    $("#tag_cloud .tag").css('line-height','2em').each(function (t) {
      // console.log($(this));
      $(this)
        .click(function (e) {
          console.log("click", e, this);

          Papa.parse('http://localhost/~tom/rod/rconstanzo-wp-plugins/tag_cloud/tag_cloud_sample_result.csv', { 
            download: true,
            header: true,
            complete: function (data) {
              // console.log(e);
              var my_html = 
                "<h2>Search results for " + e.target.textContent + "</h2>" +
                "<ul>";
                console.log(data.data);
               data.data.forEach(function(result, index) {
                my_html += "<li><a href='" + result.url + "'>" + result.text + "</a></li>";
              });;

              my_html += "</ul>";
              $('#tag_cloud #results').html(my_html);
            }
          });
        });
      });
  };

  $(create_tag_handlers);

} )( jQuery );
