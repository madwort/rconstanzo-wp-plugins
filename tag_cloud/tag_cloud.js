(function (w, $, p) {
  var tag_data;

  function htmlEncode (value) {
    if (value) {
      return $('<div />').text(value).html();
    } else {
      return '';
    }
  }

  w.create_tag_handlers = function ($path) {
    p.parse($path, { 
      download: true,
      header: true,
      complete: function (data) {
        if (data.errors.length > 0) {
          console.log("Error:", data.errors[0].message);
          console.log(tag_data);
        }
        tag_data = data;
      }
    });

    $("#tag_cloud .tag").css('line-height','2em').each(function (t) {
      $(this)
        .mouseenter(function (e) {

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

          // get the home url from the wordpress menu link
          // wget should rewrite this for us when local!
          var home_url = 
            $('#menu-main-menu #menu-item-20 a').first()
            .attr('href');
          var file_type_urls = false;
          if (home_url.indexOf('index.html') >= 0) {
            file_type_urls = true;
            home_url = home_url.replace('index.html','')
            .replace('/rodrigoconstanzo.com/','/www.rodrigoconstanzo.com/');
          }

          my_data.forEach(function(result, index) {
            my_html += "<li>...<a href='" + home_url + result.url;
            if (file_type_urls) {
              my_html = my_html.replace(/\/(#[a-z]*)?$/i,'/index.html$1');
            }
            my_html += "'target='_blank'>" +
                       htmlEncode(result.text) + "</a>...</li>";
          });

          my_html += "</ul>";
          $('#tag_cloud #results').html(my_html);
          $('#tag_cloud #results').css('left',e.pageX);
          $('#tag_cloud #results').css('top',e.pageY);
          $('#tag_cloud #results').show();
        })
        .mouseleave(function (e) {
          $('#tag_cloud #results').hide();
        });
      });
    $('#tag_cloud #results')
      .mouseenter(function (e) {
        $('#tag_cloud #results').show();
      })
      .mouseleave(function (e) {
        $('#tag_cloud #results').hide();
      });
  };

} )( window, jQuery, Papa );
