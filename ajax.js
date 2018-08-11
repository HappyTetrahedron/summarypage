/*sends an ajax request.
 *   Access the xml response via the xmlhttp variable.
 *target: target url
 *callback: callback function. It is called as soon as readystate equals 4.
 *request: the request sent via GET or POST. For GET, the ? MUST be included.
 *method: 'POST' or 'GET'
 
 */
 var xmlhttp;

function ajaxRequest(target, callback, request, method){
  
  //default values
  if (typeof request === 'undefined') { request = ''; }
  if (typeof method === 'undefined') { method = 'GET'; }
  
  if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
    }
  else
    {// code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
  xmlhttp.onreadystatechange=function(){
    if (xmlhttp.readyState==4 && xmlhttp.status==200){
      callback();
    }
  };
  
  var date = new Date();
  var timestamp = (request.indexOf("?") > 0 && method=="GET" ? "&" : "?")+ "timestamp="+ date.getTime();
  xmlhttp.open(method, (method=="GET" ? target+request+timestamp : target+timestamp),true);
  
  if(method == 'POST') {
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send(request);
  }
  
  else xmlhttp.send();
}