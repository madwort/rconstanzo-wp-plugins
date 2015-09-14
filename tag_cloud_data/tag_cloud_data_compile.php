<?php

require __DIR__ . '/vendor/autoload.php';
use PHPHtmlParser\Dom;

$urls[] = 'http://www.rodrigoconstanzo.com/thesis-introduction/';
$urls[] = 'http://www.rodrigoconstanzo.com/2015/04/making-decisions-in-time/';
$urls[] = 'http://www.rodrigoconstanzo.com/2015/06/cut-glove/';
$urls[] = 'http://www.rodrigoconstanzo.com/thesis-conclusion/';

// $keywords = [ "composition", "drums", "improvisation"];
$keywords["composition"] = ["composition", "compose"];
$keywords["improvisation"] = ["improvisation"];
$keywords["performance"] = ["performance"];
$keywords["diy"] = ["diy"];
$keywords["software"] = ["software"];
$keywords["controller"] = ["controller"];
$keywords["mapping"] = ["mapping"];
$keywords["gesture"] = ["gesture"];
$keywords["video"] = ["video"];
$keywords["analysis"] = ["analysis"];
$keywords["framework"] = ["framework"];
$keywords["feedback"] = ["feedback"];
$keywords["noise"] = ["noise"];
$keywords["interaction"] = ["interaction"];
$keywords["behavior"] = ["behavior"];
$keywords["game"] = ["game"];
$keywords["battle"] = ["battle"];
$keywords["dfscore"] = ["dfscore"];
$keywords["networked score"] = ["networked score"];
$keywords["drums"] = ["drums"];

echo "tag,term,text,url\n";

foreach ($urls as $url_key => $url) {
  // $html = file_get_contents($url);
  $dom = new Dom;
  $dom->loadFromUrl($url);
  // echo $dom->innerHtml;
  $html = $dom->find('#colLeft')[0];
  $html = strip_tags($html);
  // echo count($html);
  foreach ($keywords as $keyword => $keyword_alternatives) {
    foreach ($keyword_alternatives as $keyword_alt_id => $keyword_alternative) {
      // var_dump($keyword_alternative);
      preg_match('/.{0,15}' . $keyword_alternative . '.{0,15}/', $html, $matches);
      foreach ($matches as $key => $match) {
        // if (htmlspecialchars($match, ENT_QUOTES, "UTF-8") == "") {
        //   var_dump($match);
        //   var_dump(htmlspecialchars($match, ENT_QUOTES, "UTF-8"));
        // }
        echo $keyword.",".
          $keyword_alternative.",\"".
          $match."\",\"".
          $url."#".
          $keyword_alternative.
          ",".$key."\""."\n";
      }
    }
  }
}

?>