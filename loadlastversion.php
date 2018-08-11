<?php

  error_reporting(E_ALL); //TODO remove when done
  ini_set('display_errors', '1');
  
  copy("zufa_old1.xml", "zufa_temp.xml");
  
  copy("zufa.xml" , "zufa_old1.xml");
  
  copy("zufa_temp.xml" , "zufa.xml");



?>