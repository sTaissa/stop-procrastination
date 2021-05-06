butActived.addEventListener("click", async () => {
    chrome.storage.sync.get(['activ'], function(result) {
        if (result.activ == false){
            chrome.storage.sync.set({activ: true});
            console.log(result.activ);
        } else {
            chrome.storage.sync.set({activ: false});
            console.log(result.activ);
        }
    });
})