//list of sites that user should be "warned"
var sites = ["facebook", "instagram"];

//set the button in "idle mode" initially
chrome.storage.sync.set({activ: false});

//function to check if the current tab is part of the list of sites
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

//when current tab is updated
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  //get the button mode
  chrome.storage.sync.get(['activ'], function(result) {
    //if its active and tab has a url, call match function
    if (result.activ == true && changeInfo.url != undefined) {
      match(changeInfo.url);
    }
  });
}); 

//when a tab is activated
chrome.tabs.onActivated.addListener(function(activeInfo) {
  //get the info(inclunding url) of activated tab
  chrome.tabs.get(activeInfo.tabId, function(tab){
    //get the button mode
    chrome.storage.sync.get(['activ'], function(result) {
      //if its active and tab has a url, call match function
      if (result.activ == true && tab.url != undefined) {
        match(tab.url);
      }
    });
  });
});

//changes the button mode everytime it is clicked
chrome.storage.onChanged.addListener(function (changes) {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    chrome.storage.sync.set({activ: newValue});
  }
});