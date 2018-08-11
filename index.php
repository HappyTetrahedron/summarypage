<!DOCTYPE html>
 
 <html>
  <head>
    <title>Die epische Zusammenfassung</title>
    
    <link rel="stylesheet" type="text/css" href="style.css">
    <script type="text/javascript" src="zufa.js"></script>
    <script type="text/javascript" src="ajax.js"></script>
    
  </head>
  
  <body onload="prepare()">
    <div id="controls">
      <div id="scroller">
        <div id="chopper">
          <br/>
          <form id="chooseform">
            <p>
              <a href="#lastEntry">Zum letzten Eintrag springen</a>
            </p>
              <h2>Kapitel&uuml;bersicht</h2>
              <div id="chapterList">
                <ul id="chapterListContents">
                </ul>
              </div>
              <h2><a onclick="toggleCharList()">Nach Charakter filtern: <span id="charListArrow">v</span></a></h2>
              <div id="charList" style="display:none;">
                <?php 
                
                  include("controls.php"); //fetch the controls form 

                  echo '<input type="checkbox" id="checkall" onclick="uncheckChars()" value="all"> Zeige alle <br>';
                  
                  foreach($controls as $thiscontrol) {
                    echo '<h3>';
                    echo $thiscontrol['title'];
                    echo '</h3> <p>';
                    
                    foreach($thiscontrol['chars'] as $thischar){
                      echo '<input type="checkbox" class="checkchar" onclick="uncheckCheckall()" value="';
                      echo $thischar['name'];
                      echo '"> ';
                      echo $thischar['disp'];
                      echo ' <br>';
                    }
                    
                    echo '</p>';
                    
                  }
                
                ?>
              </div>
          </form>
          <br/>
        </div>
      </div>
    </div>
    
    <div id="contents">
    </div>
  
  </body>
  
</html>
