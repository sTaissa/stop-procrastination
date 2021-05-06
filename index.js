chrome.storage.sync.set({activ: false});

actived.addEventListener("click", async () => {
    chrome.storage.sync.get(['activ'], function(result) {
        if (result.activ == false){
            chrome.storage.sync.set({activ: true});
        } else {
            chrome.storage.sync.set({activ: false});
        }
    });
})