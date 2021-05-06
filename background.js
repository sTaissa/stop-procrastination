//list of sites that user should be "warned"
var sites = ["facebook", "instagram"];

//check if the current tab is part of the list of sites
function match(url){
    for (i in sites) {
        if (url.includes(sites[i])) {
            //if true, run the script that displays an alert
            console.log("achou");
            break;
        } 
    } 
}

function message() {
    alert("Don't waste time with this, do something more productive!");
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
   console.log(changeInfo.url + " aa");
   if (changeInfo.url != undefined) {
        match(changeInfo.url);
   }
}); 

chrome.tabs.onActivated.addListener(function(activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function(tab){
     console.log(tab.url);
     if (tab.url != undefined) {
        match(tab.url);
     }
  });
});