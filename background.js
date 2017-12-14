var id;
var on = false;
chrome.browserAction.setIcon({ path: "icongray38.png" });
function checkForSpotify(a, b, c) {
	if(!on) {
		if(b.url!=null) {
			//console.log(b.url);
			//console.log(c);
			if(b.url.includes("open.spotify.com")) {
				chrome.browserAction.setIcon({ path: "icon38.png" });
				id = a;
				on = true;
			}
		}
	}
}

function checkAllTabs(a){
	var ts = a;
	for(i = 0;i<ts.length;i++) {
		if(ts[i].url.includes("open.spotify.com")) {
			chrome.browserAction.setIcon({ path: "icon38.png" });
			id = a;
			on = true;
		}
	}
}
function checkSpotifyClose(a,b){
	if(on==true && a==id) {
		id=null;
		on=false;
		chrome.browserAction.setIcon({ path: "icongray38.png"});
	}
}
/*
KEY: d96e5c780f766d5fb29766f5fd8bb4d8
*/

/*
function sendRequest() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET',
    'http://api.cajunlyrics.com/LyricSearchList.php?artist=Waylon%20Thibodeaux&title=');
    xhr.onreadystatechange = function () {
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200 ) {
        console.log(xhr.responseText);
    }
    };
    xhr.send();
}
sendRequest();
*/

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  return xhr;
}

var xhr = createCORSRequest('GET', 'http://cors-proxy.htmldriven.com/?url=http://api.cajunlyrics.com/LyricSearchList.php?artist=Waylon%20Thibodeaux&title=');
if (!xhr) {
  throw new Error('CORS not supported');
}
xhr.onload = function() {
 var responseText = xhr.responseText;
 console.log(responseText);
 // process the response.
};

xhr.onerror = function() {
  console.log('There was an error!');
};
xhr.send();

chrome.tabs.query({}, checkAllTabs);
chrome.tabs.onUpdated.addListener(checkForSpotify);
chrome.tabs.onRemoved.addListener(checkSpotifyClose);