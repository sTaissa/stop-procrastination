butActived.addEventListener("click", function(){
    if (butActived.value == 'true') {
        butActived.value = false;
    } else {
        butActived.value = true;
    }
})

//dispara changeButton sempre que o valor deste é alterado
var observer = new MutationObserver( changeButton);
var config = {attributes: true }; //mudanças a serem oservadas(atributos no caso)
  
function changeButton(mutations) {
    console.log( mutations );
}
  
observer.observe(butActived, config);