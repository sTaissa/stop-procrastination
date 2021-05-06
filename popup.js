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

var sites = ["facebook", "instagram"];
var list = document.querySelector('#listSites');
for (let i = 0; i < sites.length; i++) {
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(sites[i]));
    list.appendChild(li);
}