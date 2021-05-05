//list of sites that user should be "warned"
var sites = ["facebook", "instagram"];

//when the extension is clicked
chrome.action.onClicked.addListener((tab) => {
    //check if the current tab is part of the list of sites
    for (i in sites) {
        if (tab.url.includes(sites[i])) {
            //if true, run the scipt that displays an alert
            chrome.scripting.executeScript({
                target: {tabId: tab.id}, 
                function: message
            });
            break;
        } else {
            console.log("não achou, so pra controle");
        }
    } 
});

function message() {
    alert("Don't waste time with this, do something more productive!");
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
   console.log(changeInfo.url + " aa");
}); 

chrome.tabs.onActivated.addListener(function(activeInfo) {
  // how to fetch tab url using activeInfo.tabid
  chrome.tabs.get(activeInfo.tabId, function(tab){
     console.log(tab.url);
  });
});