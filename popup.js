//events
document.querySelector("#but-actived").addEventListener("click", actives);

let el = document.querySelectorAll("button");
for (i = 0; i < el.length; i++) {
    el[i].addEventListener("click", function(){
        hide(this.id);
    });
}

var sites = ["facebook", "instagram"];
var list = document.querySelector('#list-sites');
for (let i = 0; i < sites.length; i++) {
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(sites[i]));
    list.appendChild(li);
}

//changes the storage value 
function actives(){
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

//add a new site to the list
function add(event){
    event.preventDefault();//doesn't allow page to reload after form submission as default

    let form = document.querySelector("#form-add");
    formSite = form.site.value;

    addLine(formSite);
    form.reset();
}

//create a new line in the list
function addLine(newSite){
    let listEl = document.createElement("li");

    listEl.textContent = newSite;

    document.querySelector("#list-sites").appendChild(listEl);
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