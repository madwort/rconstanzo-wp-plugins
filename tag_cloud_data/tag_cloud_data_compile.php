<?php

$urls = [
  'http://www.rodrigoconstanzo.com/thesis-introduction/',
  'http://www.rodrigoconstanzo.com/2015/04/making-decisions-in-time/',
  'http://www.rodrigoconstanzo.com/2015/06/cut-glove/',
  'http://www.rodrigoconstanzo.com/thesis-conclusion/',
  'http://www.rodrigoconstanzo.com/2013/09/com-pieces/',
  'http://www.rodrigoconstanzo.com/2013/02/strikethrough-me-you-battle-pieces/',
  'http://www.rodrigoconstanzo.com/2015/11/dfscore-2/',
  'http://www.rodrigoconstanzo.com/dfscore/',
  'http://www.rodrigoconstanzo.com/2013/10/everything-at-once/',
  'http://www.rodrigoconstanzo.com/2014/03/everything-everything-at-once-once-2/',
  'http://www.rodrigoconstanzo.com/2015/02/everything-everything-at-once-once-3/',
  'http://www.rodrigoconstanzo.com/the-party-van/',
  'http://www.rodrigoconstanzo.com/2015/05/karma/',
  'http://www.rodrigoconstanzo.com/combine/',
  'http://www.rodrigoconstanzo.com/grassi-box/'
];

$keywords["composition"] = ["composed", "compose", "composer"];
$keywords["improvisation"] = ["improv", "improvised", "improviser", "improvising"];
$keywords["performance"] = ["performer", "performed"];
$keywords["meta"] = ["meta", "meta-creative"];
$keywords["diy"] = ["diy", "DIY", "luthier", "build", "instrument"];
$keywords["software"] = ["software"];
$keywords["dfscore"] = ["dfscore", "dfs", "networked score", "network score"];
$keywords["controller"] = ["controller", "gamepad", "monome"];
$keywords["gamepad"] = ["controller"];
$keywords["mapping"] = ["mapping", "mapped", "map"];
$keywords["gesture"] = ["gesture"];
$keywords["form"] = ["form", "formal"];
$keywords["memory"] = ["memory", "memories"];
$keywords["interaction"] = ["interact", "interacted"];
$keywords["behavior"] = ["behavior", "behaviour", "behaviors"];
$keywords["game"] = ["game", "etude", "battle", "challenge"];
$keywords["battle"] = ["battle", "game", "etude", "challenge"];
$keywords["analysis"] = ["analysis", "analyses", "analyzed", "analysed"];
$keywords["video"] = ["video", "videos", "film", "filmed"];
$keywords["drums"] = ["drums", "percussion"];
$keywords["feedback"] = ["feedback"];

echo "tag,term,text,url\r\n";

foreach ($urls as $url_key => $url) {

  // $url_key = 2;
  // $url = $urls[$url_key];
  $html = file_get_contents($url);
  $html_no_scripts = preg_replace('#<script(.*?)>(.*?)</script>#is', '', $html);
  $clean_html = html_entity_decode(strip_tags($html_no_scripts));

  foreach ($keywords as $keyword => $keyword_alternatives) {
    foreach ($keyword_alternatives as $keyword_alt_id => $keyword_alternative) {
      // var_dump($keyword_alternative);
      preg_match_all('/.{0,15}\b' . $keyword_alternative .
                     '\b.{0,15}/u', $clean_html, $matches
                    );
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
