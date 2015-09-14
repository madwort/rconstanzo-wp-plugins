( function($) {
  var tag_data;

  Papa.parse('tag_cloud/tag_cloud_data.csv', { 
    download: true,
    header: true,
    complete: function (data) {
      tag_data = data;
    }
  });

  function create_tag_handlers() {
    $("#tag_cloud .tag").css('line-height','2em').each(function (t) {
      // console.log($(this));
      $(this)
        .click(function (e) {
          console.log("click", e, this);

          if (typeof tag_data === 'undefined' ) {
            console.log("tag_data not loaded");
            $('#tag_cloud #results').html("tag_data not loaded");
            return;
          }

          var my_html = 
            "<h2>Search results for " + e.target.textContent + "</h2>" +
            "<ul>";
          var my_data = (tag_data.data.filter(function(d){
            return (d.tag == e.target.textContent);
          }));
          console.log(my_data);
          my_data.forEach(function(result, index) {
            my_html += "<li><a href='" + result.url + "'>" + result.text + "</a></li>";
          });;

          my_html += "</ul>";
          $('#tag_cloud #results').html(my_html);
        });
      });
  };

  $(create_tag_handlers);

} )( jQuery );
