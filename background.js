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
			}
		}
	}
}

function checkSong(a,b,c) {

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


chrome.tabs.query({}, checkAllTabs);
chrome.tabs.onUpdated.addListener(checkForSpotify);
chrome.tabs.onRemoved.addListener(checkSpotifyClose);
