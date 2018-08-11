var xml;

function prepare(){
  fetchData()
}

function fetchData(){
  ajaxRequest('zufa.xml', function(){
    
      var entries = xmlhttp.responseXML.documentElement.getElementsByTagName("entry");
      var txt = '';
      
      xml = xmlhttp.responseXML;
      
      for(var i=0; i<entries.length; i++){

        var location = nodeAsString(entries[i].getElementsByTagName("location")[0]);
        var tagline = nodeAsString(entries[i].getElementsByTagName("tagline")[0]);
        var people = nodeAsString(entries[i].getElementsByTagName("people")[0]);
        var text = nodeAsString(entries[i].getElementsByTagName("text")[0]);
        
        txt = txt + "<h1>" + location + '</h1>';
        txt = txt + "<h4>" + tagline + '</h4>';
        txt = txt + "<p><i>" + people + '</i></p>';
        
        txt = txt + '<button onclick="prepareEditEntry(' + i + ')"> bearbeiten </button>';
        txt = txt + '<button onclick="prepareInsertBeforeEntry(' + i + ')"> dar&uuml;ber einf&uuml;gen </button>';
        if(i != 0) txt = txt + '<button onclick="moveUp(' + i + ')"> ^^^ </button>';
        if(i != entries.length - 1) txt = txt + '<button onclick="moveDown(' + i + ')"> vvv </button>';
        txt = txt + '<button onclick="deleteEntry(' + i + ')"> L&ouml;schen </button>';
        
        txt = txt + "<p>" + text + '</p><br/>';
      
      }
      txt = txt + '<button onclick="prepareInsertAtEnd()">Am Ende einf&uuml;gen</button>';
      
      
      
      document.getElementById("contents").innerHTML = txt;
  
  });
}

function saveData(){
  ajaxRequest('savexml.php', function(){

    fetchData();
  
  }, 'xml=' + xmlToString(xml), 'POST');

}

function ctrlz(){
  ajaxRequest('loadlastversion.php', function(){
    
    fetchData();
    
  });
}

function moveUp(i){
  var myNode = xml.documentElement.getElementsByTagName("entry")[i];
  var prevNode = xml.documentElement.getElementsByTagName("entry")[i-1];
  
  //Move the whitespaces too for formatting
  var whitespace = myNode.nextSibling;
  
  xml.documentElement.insertBefore(whitespace, prevNode);
  xml.documentElement.insertBefore(myNode, whitespace);
  
  saveData();
}

function moveDown(i){
  var myNode = xml.documentElement.getElementsByTagName("entry")[i];
  var whitespace = myNode.nextSibling; //also move whitespace for formatting
  
  if(i >= xml.documentElement.getElementsByTagName("entry").length - 2) { //second to last node
    xml.documentElement.appendChild(document.createTextNode("\n"));
    xml.documentElement.appendChild(myNode);
    xml.documentElement.appendChild(whitespace);
  }
  
  else {
    nextnextNode = xml.documentElement.getElementsByTagName("entry")[i+2]; //we use insertBefore(), so we need the node after the next node.
    xml.documentElement.insertBefore(whitespace, nextnextNode);
    xml.documentElement.insertBefore(myNode, whitespace);
  }
  saveData();
}

function hideEditor(flush=true){

  if(flush) {
    document.getElementById("editorLocation").value = '';
    document.getElementById("editorPeople").value = '';
    document.getElementById("editorText").value = '';
  }
  
  document.getElementById("editor").style.display="none";
}

function prepareInsertBeforeEntry(i){
  var btn = document.getElementById("savebutton");
  
  btn.setAttribute("onclick", 'insertBeforeEntry('+i+')');
  
  document.getElementById("editor").style.display = "block";
}

function insertBeforeEntry(i){
  var nextNode = xml.documentElement.getElementsByTagName("entry")[i];
  var myNode = editorToNode();
  
  xml.documentElement.insertBefore(myNode, nextNode);
  xml.documentElement.insertBefore(document.createTextNode("\n\n"), nextNode);
  

  saveData();
}

function prepareInsertAtEnd(){
  var btn = document.getElementById("savebutton");
  
  btn.setAttribute("onclick", 'insertAtEnd()');
  
  document.getElementById("editor").style.display = "block";
}

function insertAtEnd(){
  var myNode = editorToNode();
  
  xml.documentElement.appendChild(document.createTextNode("\n"));
  xml.documentElement.appendChild(myNode);
  xml.documentElement.appendChild(document.createTextNode("\n\n"));
  
  saveData();
}

function prepareEditEntry(i){
  var entry = xml.documentElement.getElementsByTagName("entry")[i];
  
  var location = entry.getElementsByTagName("location")[0].innerHTML.replaceAll("\n", ""); //get location text and strip the line breaks
  var tagline = entry.getElementsByTagName("tagline")[0].innerHTML.replaceAll("\n", ""); //same
  var people = entry.getElementsByTagName("people")[0].innerHTML.replaceAll("\n", ""); //same
  
  var text = entry.getElementsByTagName("text")[0].innerHTML;
  text = text.replaceAll("\n", ""); //strip all line breaks
  text = text.replaceAll(/<br.*?\/>/, "\n");//.replaceAll('<br />', "\n");  //replace both kinds of br tags with line breaks.
  
  document.getElementById("editorLocation").value = location;
  document.getElementById("editorTagline").value = tagline;
  document.getElementById("editorPeople").value = people;
  document.getElementById("editorText").value = text;
  
  var btn = document.getElementById("savebutton");
  btn.setAttribute("onclick", 'editEntry('+i+')');
  
  document.getElementById("editor").style.display = "block";
}

function editEntry(i){
  var oldNode = xml.documentElement.getElementsByTagName("entry")[i];
  var myNode = editorToNode();
  
  xml.documentElement.insertBefore(myNode, oldNode);
  xml.documentElement.removeChild(oldNode);
  
  saveData();
}

function deleteEntry(i){
  if(confirm("Willst du wirklich diesen Eintrag löschen? \nDies kann nicht rückgängig gemacht werden.")) {
    var myNode = xml.documentElement.getElementsByTagName("entry")[i];
    var whitespace = myNode.nextSibling;
    
    xml.documentElement.removeChild(whitespace);
    xml.documentElement.removeChild(myNode);
    
    saveData();
  }
}

function editorToNode() {

  var locationText = document.getElementById("editorLocation").value;
  var taglineText = document.getElementById("editorTagline").value;
  var peopleText = document.getElementById("editorPeople").value;
  var textText = document.getElementById("editorText").value;

  var entry = document.createElement('entry');
  
  var location = document.createElement('location');
  var tagline = document.createElement('tagline');
  var people = document.createElement('people');
  var text = document.createElement('text');
  
  location.appendChild(document.createTextNode("\n"+locationText+"\n"));
  tagline.appendChild(document.createTextNode("\n"+taglineText+"\n"));
  people.appendChild(document.createTextNode("\n"+peopleText+"\n"));
  
  var textArray = textText.split('\n');
  
  for(var i=0; i<textArray.length; i++) {
    if(i>0) text.appendChild(document.createElement("br"));
    text.appendChild(document.createTextNode("\n"+textArray[i]+"\n"));
  }
  
  entry.appendChild(document.createTextNode("\n"));
  entry.appendChild(location);
  entry.appendChild(document.createTextNode("\n"));
  entry.appendChild(tagline);
  entry.appendChild(document.createTextNode("\n"));
  entry.appendChild(people);
  entry.appendChild(document.createTextNode("\n"));
  entry.appendChild(text);
  entry.appendChild(document.createTextNode("\n"));
  
  hideEditor();
  return entry;
}

function xmlToString(thexml){
	if(thexml.xml){
		// MSIE
		xmlString = thexml.xml;
	}else{
		// Gecko
		xmlString = (new XMLSerializer).serializeToString(thexml);
	}
	return xmlString;
}


function nodeAsString(node){

  var children = node.childNodes;
  var assembled = '';
  for(var j=0; j<children.length; j++) {
    //We have either text or a br tag. The xml parts contain nothing else.
    if(children[j].nodeName == 'br') assembled = assembled + '</p><p>';
    else assembled = assembled + children[j].nodeValue;
  }
  return assembled;
  
}

String.prototype.replaceAll = function(search, replace) {
  if (replace === undefined) {
    return this.toString();
  }
  return this.split(search).join(replace);
}
