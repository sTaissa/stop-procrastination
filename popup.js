//events
document.querySelector("#but-add").addEventListener("click", hide);
document.querySelector("#but-submit").addEventListener("click", hide);

//arrumar esse como um evento e funcao separada em outro commit
document.querySelector("#but-actived").addEventListener("click", function() {
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
var list = document.querySelector('#list-sites');
for (let i = 0; i < sites.length; i++) {
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(sites[i]));
    list.appendChild(li);
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

//allows the add sites div to appear and hide
function hide(){
    let divSites = document.querySelector("#div-sites");
    let divAdd = document.querySelector("#div-add");
    let displaySites = divSites.style.display;

    if(displaySites == 'none') {
        add(event);
        divSites.style.display = 'block';
        divAdd.style.display = 'none';
    } else {
        divSites.style.display = 'none';
        divAdd.style.display = 'block';
    }
}