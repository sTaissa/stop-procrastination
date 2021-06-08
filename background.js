//set the button in "idle mode" initially
chrome.storage.sync.set({activ: false});

//function to check if the current tab is part of the list of sites
function match(url, tabId){
  chrome.storage.sync.get(['sites'], function(result){
    for (i in result.sites){
      console.log(result.sites[i]);
      if (url.includes(result.sites[i])) {
        console.log("foi");
        //if true, run the script that displays an alert
        chrome.scripting.executeScript({
          target: {tabId: tabId},
          function: message
        });
        break;
      }
    }
  });
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
      match(changeInfo.url, tabId);
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
        match(tab.url, tab.id);
      }
    });
  });
});