<?php

// $stuff = str_getcsv('id,title,date,instrumentation,blurb,edit,proof,draft,page,comments,video url,embed');
$stuff = str_getcsv(file_get_contents('/Users/tom/Sites/rod/rconstanzo-wp-plugins/restructuring_piece_project_diagram_assets/blurbs.csv'));
var_dump($stuff);

?>