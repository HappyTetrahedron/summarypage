var keywords;

function fetchData(){

  if(document.getElementById('checkall').checked){
    keywords = 0;
  }
  
  else{
    var checks = document.getElementsByClassName('checkchar');
    keywords = ":"; // : is the separator
    
    for(var i=0; i<checks.length; i++){
      if(checks[i].checked){
        keywords = keywords + checks[i].value + ':';
      }
    }
    
    //If nothing is checked, we fetch everything. If we have checked stuff, we need to strip the first and last separator.
    keywords = (keywords == ':' ?  0 : keywords.substring(1, keywords.length-1));
  }
  
  load();
}

function uncheckCheckall(){
  document.getElementById('checkall').checked = false;
  fetchData();
}

function uncheckChars(){
  var checks = document.getElementsByClassName('checkchar');
    
  for(var i=0; i<checks.length; i++){
    checks[i].checked = false;
  }
  fetchData();
}

function toggleCharList(){
  var div = document.getElementById('charList');
  div.style.display = div.style.display == "none" ? "block" : "none";
  var span = document.getElementById('charListArrow');
  span.innerText = span.innerText == "v" ? "^" : "v";
}

function prepare(){
  document.getElementById('checkall').checked = true;
  uncheckChars();
}

function restoreHash(){
  var hash = location.hash;
  location.hash = "";
  location.hash = hash;
}

function load(){
  ajaxRequest('zufa.xml', function(){
  
      keywords = (keywords == 0 ? 0 : keywords.split(':'));
    
      var entries = xmlhttp.responseXML.documentElement.getElementsByTagName("entry");
      var txt = '';
      var indexTxt = '';
      var fetchThisOne = false;
      
      for(var i=0; i<entries.length; i++){

        if(fetchThisOne == true){
          
          txt = txt + '<h1><a id="' + encodeURI(location.trim()) + '"></a>' + location + '</h1>';
          txt = txt + '<h4>' + tagline + '</h4>';
          txt = txt + "<p>" + text + '</p><br/>';
          
        }

        fetchThisOne = false;
        
        if (keywords == 0){ //fetch everything
          
          fetchThisOne = true;
          
        }
        
        else { //fetch whatever matches
        
          var people = nodeAsString(entries[i].getElementsByTagName("people")[0]);
          var matches = false;
          
          //We stop checking after finding one match. One's enough.
          for(var j=0; j<keywords.length && matches == false; j++){
            //That's also why we don't check whether matches is already true.
            matches = contains(people, keywords[j]);
          }
          
          //If it matches, fetch.
          if(matches == true) fetchThisOne = true;
          
        }
        
        if(fetchThisOne == true){
          var location = nodeAsString(entries[i].getElementsByTagName("location")[0]);
          var tagline = nodeAsString(entries[i].getElementsByTagName("tagline")[0]);
          var text = nodeAsString(entries[i].getElementsByTagName("text")[0]);
          indexTxt = indexTxt + '<li><h4><a href="#' + encodeURI(location.trim()) + '">' + location + '</a></h4>';
          indexTxt = indexTxt + '<p>' + tagline + '</p></li>';
        }
      
      }
      if(location){
        txt = txt + '<h1><a id="lastEntry"></a><a id="' + encodeURI(location.trim()) + '"></a>' + location + '</h1>';
        txt = txt + '<h4>' + tagline + '</h4>';
        txt = txt + "<p>" + text + '</p><br/>';
      }
      
      
      
      document.getElementById("contents").innerHTML = txt;
      document.getElementById("chapterListContents").innerHTML = indexTxt;

      restoreHash();
  
  });
}

function contains(haystack, needle){
  return haystack.indexOf(needle) > -1;
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
