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
        for (i in result.sites) {
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
    store(formSite, "add");

    form.reset();
}

//create a new line in the list
function addLineList(site){ 
    let li = document.createElement("li");
    li.textContent = site;
    document.querySelector("#list-sites").appendChild(li);
}

//create a new line in the table
function addLineTable(site){
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    let del = document.createElement("td");
    let butDel = document.createElement("button");
    let edit = document.createElement("td");
    let butEdit = document.createElement("button");
    
    td.textContent = site;
    td.className = "site";
    butDel.textContent = "Delete";
    del.className = "delete";
    butEdit.textContent = "Edit";
    edit.className = "edit";

    tr.appendChild(td);
    del.appendChild(butDel);
    edit.appendChild(butEdit);
    tr.appendChild(del);
    tr.appendChild(edit);

    document.querySelector("#tab-sites").appendChild(tr);
}

//delete the sites
function delet(){
    let table = document.querySelectorAll(".delete");
    let list = document.querySelectorAll("li");
    for (i = 0; i < table.length; i++) {
        table[i].addEventListener("click", function() {
            let tr = this.parentNode;
            var site = tr.children[0].textContent;
            
            //deleting from table
            this.parentNode.remove();

            //deleting from list
            for(i = 0; i < list.length; i++){
                if(list[i].textContent == site){
                    list[i].remove();
                }
            }

            store(site, "del");
        });
    }
}

//edit the sites
function edit(){
    //when edit button in clicked
    let table = document.querySelectorAll(".edit");
    for (i = 0; i < table.length; i++) {
        table[i].addEventListener("click", function() {
            editLine(this);
        });
    }

    //when clicking on the site you want to edit
    let el = document.querySelectorAll("td");
    for (i = 0; i < el.length; i++) {
        el[i].addEventListener("click", function(event){
            console.log("foi");
            editLine(this);
        });
    }
}

function editLine(click){
    let tr = click.parentNode;
    var oldSite = tr.children[0].textContent;
    let td = tr.children[0];
    let input = document.createElement("input");

    input.type = "text";
    input.value = oldSite;
    td.textContent = "";
    td.appendChild(input);
    td.children[0].focus();

    //when enter is clicked (save)
    td.addEventListener("keypress", function(e){
        //enter is rated 13
        if(e.which == 13){
            //editing from table
            let newSite = this.children[0].value; //"this" refers to the td that contains the input in this scope
            this.textContent = newSite;

            //editing from list
            let list = document.querySelectorAll("li");
            for(i = 0; i < list.length; i++){
                if(list[i].textContent == oldSite){
                    list[i].outerHTML = "<li>" + newSite + "</li>";
                }
            }
            store(oldSite, "edit", newSite);
        }
    });

    //when exiting the input without saving
    td.children[0].addEventListener("blur", function(){
        this.parentNode.textContent = oldSite;
    });
}

//changes the storage
function store(site, action, newSite){
    //get the sites in an array
    chrome.storage.sync.get(['sites'], function(result){
        var arrSites = [];
        for (i = 0; i < result.sites.length; i++){
            arrSites.push(result.sites[i]);
        }
    
        //add or delete the site, depending on specified action
        if(action == "add"){
            arrSites.push(site);
        } else{
            siteID = arrSites.indexOf(site);
            if(siteID > -1){//if the information is not found it returns -1
                if(action == "del"){
                    arrSites.splice(siteID, 1);
                } else if(action == "edit"){
                    arrSites.splice(siteID, 1, newSite);
                }
            }
        }

        //add the new array to storage
        chrome.storage.sync.set({sites: arrSites});
    });
}

//allows the add sites div and personalize sites div to appear and hide
function hide(butId){
    let divDefault = document.querySelector("#div-default");
    let divSites = document.querySelector("#div-sites");
    let divAdd = document.querySelector("#div-add");

    //appear add screen
    if(butId == "but-add"){
        divSites.style.display = 'none';
        divAdd.style.display = 'block';
        divDefault.style.display = 'none';
    //appear initial screen (list)
    } else if(butId == "but-apply"){
        divSites.style.display = 'none';
        divAdd.style.display = 'none';
        divDefault.style.display = 'block';
    //appear table screen
    } else if(butId == "but-default" || butId == "but-submit" || butId == "but-back"){
        if(butId == "but-submit"){
            add(event);
        }
        divSites.style.display = 'block';
        divAdd.style.display = 'none';
        divDefault.style.display = 'none';
        delet();
        edit();
    }
}