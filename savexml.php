<?php

  error_reporting(E_ALL); //TODO remove when done
  ini_set('display_errors', '1');
  
  $xmlcont = $_POST['xml'];
  
  $searchs = array("ä", "ö", "ü", "Ä", "Ö", "Ü", "é", "í", "ß", "„", "“", "’", "‚", "–");
  $replaces = array("&#228;", "&#246;", "&#252;", "&#196;", "&#214;", "&#220;", "&#233;", "&#237;", "&#223;", '"', '"', "'", "'", "&#45;");
  
  $xmlcont = str_replace($searchs, $replaces, $xmlcont);
  
  echo 'Content of XML: <br><br>';
  echo $xmlcont;
  
  //We want to keep 10 backups.
  for($i=10; $i>1; $i--) {
    copy("zufa_old".($i-1).".xml", "zufa_old".$i.".xml");
  }
  
  copy("zufa.xml" , "zufa_old1.xml");
  
  $file = fopen('zufa.xml', 'w');
  
  fputs($file, $xmlcont);



?>