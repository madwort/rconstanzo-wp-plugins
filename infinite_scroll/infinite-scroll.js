( function($) {
  function generateText() {
    var myText = "";

    if(Math.random()>0.7) {
      // 30% prob
      myText += "This is ";
    } else {
      if(Math.random()>0.5) {
        // 60% prob
        myText += "You are reading ";
      } else {
        // 40%
        myText += "Here we have ";
      }
  
    }

    var textPhrase = "";

    if(Math.random()>0.4) {
      myText += "a placeholder ";
      textPhrase = "placeholder";
    } else {
      myText += "stand-in text ";
      textPhrase = "text";
    }

    myText += "for the ";

    if(Math.random()>0.3) {
      myText += "text ";
    } else {
      myText += "content ";
    }

    myText += "that will " 

    if(Math.random()>0.3) {
      myText += "make up";
    } else {
      myText += "comprise ";
    }

    myText += " the first chapter of ";

    if(Math.random()>0.1) {
      myText += "Rodrigo Constanzo";
    } else {
      myText += "the badass MF";
    }

    myText += "'s web thesis.";

    myText += " This "+textPhrase+" can take "

    if(Math.random()>0.5) {
      myText += "many forms, ";
    } else {
      myText += "a multiplicity of approaches whilst ";
    }

    myText += "attempting to explain "

    if(Math.random()>0.5) {
      myText += "the same concepts ";
    } else {
      myText += "similar ideas ";
    }

    myText += " from ";

    if(Math.random()>0.5) {
      myText += "different perspectives.";
    } else {
      myText += "alternative viewpoints.";
    }

    return myText;

  }

  $(window).scroll(function() {
  	if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
      $("div#scroll-to-read p#continue-reading").fadeOut();
      $("div#scroll-to-read").append("<p style='display:none;'>"+generateText()+"</p>");
      $("div#scroll-to-read p").filter(':last').fadeIn("slow");
     }
  });
} )( jQuery );