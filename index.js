function loadLocalStorage(){
    var checked = JSON.parse(localStorage.needs)
    var div = document.getElementById("checkboxes").getElementsByTagName("input")
    for(var i = 0; i< div.length; i++){
        if(checked.includes(div[i].name)){
            div[i].checked = true
        }
    }
    console.log(checked)
}

function getLocalStorage(){
    var checked = JSON.parse(localStorage.needs)
    var div = document.getElementById("center")
    for(var i=0; i<checked.length; i++){
        var p = document.createElement('p')
        var text = document.createTextNode(checked[i])
        p.appendChild(text)
        div.appendChild(p)
    }
}

function saveLocalStorage() {
    var div = document.getElementById("checkboxes").getElementsByTagName("input")
    var checked = [];
    for (var i = 0; i < div.length; i++) {
        if (div[i].checked) {
            checked.push(div[i].name)
            console.log(div[i].name)
        }
    }
    localStorage.needs = JSON.stringify(checked)
    console.log(checked)
}