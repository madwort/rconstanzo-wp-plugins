( function($) {
  function create_tag_handlers() {
    $("#tag_cloud .tag").css('line-height','2em').each(function (t) {
      // console.log($(this));
      $(this)
        .click(function (e) {
          console.log("click", e, this);

          $.getJSON('tag_cloud/tag_cloud_sample_result.json', function (data) {
            var my_html = 
              "<h2>Search results for " + data.search + "</h2>" +
              "<ul>";

             data.results.forEach(function(result, index) {
              my_html += "<li><a href='" + result.url + "'>" + result.text + "</a></li>";
            });;

            my_html += "</ul>";
            $('#tag_cloud #results').html(my_html);
          });
        });
      });
  };

  $(create_tag_handlers);

} )( jQuery );
