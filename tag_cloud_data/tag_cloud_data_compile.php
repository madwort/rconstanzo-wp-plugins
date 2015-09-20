<?php

$urls = [
  'http://www.rodrigoconstanzo.com/thesis-introduction/',
  'http://www.rodrigoconstanzo.com/2015/04/making-decisions-in-time/',
  'http://www.rodrigoconstanzo.com/2015/06/cut-glove/',
  'http://www.rodrigoconstanzo.com/thesis-conclusion/',
  'http://www.rodrigoconstanzo.com/2013/09/com-pieces/',
  'http://www.rodrigoconstanzo.com/combine/',
  'http://www.rodrigoconstanzo.com/grassi-box/',
  'http://www.rodrigoconstanzo.com/2013/10/everything-at-once/',
  'http://www.rodrigoconstanzo.com/2014/03/everything-everything-at-once-once-2/',
  'http://www.rodrigoconstanzo.com/2015/02/everything-everything-at-once-once-3/',
  'http://www.rodrigoconstanzo.com/2013/02/strikethrough-me-you-battle-pieces/',
  'http://www.rodrigoconstanzo.com/the-party-van/',
  'http://www.rodrigoconstanzo.com/2015/05/karma/',
  'http://www.rodrigoconstanzo.com/2013/12/an-amplifier/'
];

$keywords["composition"] = ["composition", "compose"];
$keywords["improvisation"] = ["improv"];
$keywords["performance"] = ["performance", "performed"];
$keywords["diy"] = ["diy"];
$keywords["software"] = ["software"];
$keywords["controller"] = ["controller"];
$keywords["mapping"] = ["mapping", "mapped"];
$keywords["gesture"] = ["gesture"];
$keywords["video"] = ["video"];
$keywords["analysis"] = ["analysis", "analyses", "analyzed", "analysed"];
$keywords["framework"] = ["framework"];
$keywords["feedback"] = ["feedback"];
$keywords["noise"] = ["noise"];
$keywords["interaction"] = ["interact"];
$keywords["behavior"] = ["behavior", "behaviour"];
$keywords["game"] = ["game", "etude"];
$keywords["battle"] = ["battle"];
$keywords["dfscore"] = ["dfscore", "dfs", "networked score"];
$keywords["drums"] = ["drums", "percussion"];
$keywords["memory"] = ["memory", "memories"];
$keywords["glitch"] = ["glitch"];

echo "tag,term,text,url\r\n";

foreach ($urls as $url_key => $url) {

  // $url_key = 2;
  // $url = $urls[$url_key];
  $html = file_get_contents($url);
  $clean_html = strip_tags($html);

  foreach ($keywords as $keyword => $keyword_alternatives) {
    foreach ($keyword_alternatives as $keyword_alt_id => $keyword_alternative) {
      // var_dump($keyword_alternative);
      preg_match_all('/.{0,15}' . $keyword_alternative . '.{0,15}/', $clean_html, $matches);
      foreach ($matches[0] as $key => $match) {
        // if (htmlspecialchars($match, ENT_QUOTES, "UTF-8") == "") {
        //   var_dump($match);
        //   var_dump(htmlspecialchars($match, ENT_QUOTES, "UTF-8"));
        // }
        echo $keyword.",".
          $keyword_alternative.",\"".
          str_replace('"','""',$match)."\",\"".
          $url."#".
          $keyword_alternative.
          ",".$key."\""."\r\n";
      }
    }
  }
  // die();
}

?>
