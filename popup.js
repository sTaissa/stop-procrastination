//events
document.querySelector("#but-actived").addEventListener("click", active);

let el = document.querySelectorAll("button");
for (i = 0; i < el.length; i++) {
    el[i].addEventListener("click", function(){
        hide(this.id);
    });
}

//initial values
chrome.storage.sync.get(['sites'], function(result){
    if (!result.sites){
        var site = ["facebook", "instagram"];
        chrome.storage.sync.set({sites: site});
    }  
    initialDisplay();
});


//initial display of sites in table and list
function initialDisplay(){
    chrome.storage.sync.get(['sites'], function(result){
        for (let i = 0; i < result.sites.length; i++) {
            addLineList(result.sites[i]);
            addLineTable(result.sites[i]);
        }
    });
}

//changes the storage value to active 
function active(){
    chrome.storage.sync.get(['activ'], function(result){
        if (result.activ == false){
            chrome.storage.sync.set({activ: true});
            console.log(result.activ);
        } else {
            chrome.storage.sync.set({activ: false});
            console.log(result.activ);
        }
    });
}

//add a new site 
function add(event){
    event.preventDefault();//doesn't allow page to reload after form submission as default

    let form = document.querySelector("#form-add");
    formSite = form.site.value.toLowerCase();

    addLineList(formSite);
    addLineTable(formSite);
    store(formSite);

    form.reset();
}

//create a new line in the list
function addLineList(newSite){ 
    let li = document.createElement("li");
    li.textContent = newSite;
    document.querySelector("#list-sites").appendChild(li);
}

//create a new line in the table
function addLineTable(newSite){
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    td.textContent = newSite;
    tr.appendChild(td);
    document.querySelector("#tab-sites").appendChild(tr);
}

//store the new site in chrome storage
function store(newSite){
    chrome.storage.sync.get(['sites'], function(result){
        var arrSites = [];
        for (i = 0; i < result.sites.length; i++){
            arrSites.push(result.sites[i]);
        }
        arrSites.push(newSite);
        chrome.storage.sync.set({sites: arrSites});
    });
}

//allows the add sites div and personalize sites div to appear and hide
function hide(butId){
    let divDefault = document.querySelector("#div-default");
    let divSites = document.querySelector("#div-sites");
    let divAdd = document.querySelector("#div-add");

    if(butId == "but-add"){
        divSites.style.display = 'none';
        divAdd.style.display = 'block';
        divDefault.style.display = 'none';
    } else if(butId == "but-apply"){
        divSites.style.display = 'none';
        divAdd.style.display = 'none';
        divDefault.style.display = 'block';
    } else if(butId == "but-default" || butId == "but-submit"){
        if(butId == "but-submit"){
            add(event);
        }
        divSites.style.display = 'block';
        divAdd.style.display = 'none';
        divDefault.style.display = 'none';
    }
}