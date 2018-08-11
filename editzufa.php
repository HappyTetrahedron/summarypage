<!DOCTYPE html>
 
 <html>
  <head>
    <title>Die epische Zusammenfassung</title>
    
    <link rel="stylesheet" type="text/css" href="style.css">
    <script type="text/javascript" src="editzufa.js"></script>
    <script type="text/javascript" src="ajax.js"></script>
    
  </head>
  
  <body onload="prepare()">
    
    <div id="editor">
      <p>
        Ort: <input type="text" id="editorLocation" /><br/>
        Untertitel: <input type="text" id="editorTagline" /><br/>
        Leute: <input type="text" id="editorPeople" /><br/>
        Text: <textarea id="editorText" rows="15"></textarea>
        <button id="savebutton">Speichern</button>
        <button id="cancelbutton" onclick="hideEditor(false)">Abbrechen</button>
      </p>
    </div>
    
    <div id="backbuttondiv">
      <button id="ctrlzbutton" onclick="ctrlz()">Letzte Version laden</button>
    </div>
    <div id="contents">
    </div>
  
  </body>
  
</html>
