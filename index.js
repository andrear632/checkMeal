function loadLocalStorage(){
    if(typeof(localStorage.needs) == "undefined"){
        return
    }
    var checked = JSON.parse(localStorage.needs)
    var div = document.getElementById("needs").getElementsByTagName("input")
    for(var i = 0; i< div.length; i++){
        if(checked.includes(div[i].name)){
            div[i].checked = true
        }
    }
    console.log(checked)
}

function uncheckAll(){
    var div = document.getElementById("needs").getElementsByTagName("input")
    for(var i = 0; i<div.length; i++){
        div[i].checked = false;
    }
}

function getLocalStorage(){
    var div = document.getElementById("needs")

    if(typeof(localStorage.needs) == "undefined"){
        var row = document.createElement('div')
        row.classList.add("row")
        row.classList.add("mx-auto")
        
        var col_text = document.createElement('div')
        col_text.classList.add("col-12")
        col_text.classList.add("py-4")
        col_text.classList.add("display-4")
        col_text.classList.add("text-center")
        col_text.innerHTML = "Add your needs"

        row.appendChild(col_text)
        div.appendChild(row)

        document.getElementById("edit").innerHTML = "ADD YOUR NEEDS"
        return
    }

    var checked = JSON.parse(localStorage.needs)


    if(checked.length == 0){
        var row = document.createElement('div')
        row.classList.add("row")
        row.classList.add("mx-auto")
        
        var col_text = document.createElement('div')
        col_text.classList.add("col-12")
        col_text.classList.add("py-4")
        col_text.classList.add("display-4")
        col_text.classList.add("text-center")
        col_text.innerHTML = "Add your needs"

        row.appendChild(col_text)
        div.appendChild(row)

        document.getElementById("edit").innerHTML = "ADD YOUR NEEDS"
        return
    }

    for(var i=0; i<checked.length; i++){
        var row = document.createElement('div')
        row.classList.add("row")
        row.classList.add("mx-auto")

        var col_img = document.createElement("div")
        col_img.classList.add("col-4")
        var img = document.createElement("img")
        img.classList.add("m-auto")
        img.classList.add("d-block")
        img.classList.add("mw-100")
        img.src= "icons/"+ checked[i] + ".png"
        col_img.appendChild(img)

        var col_text = document.createElement('div')
        col_text.classList.add("col-8")
        col_text.classList.add("py-4")
        col_text.classList.add("display-4")
        col_text.innerHTML = checked[i]

        row.appendChild(col_img)
        row.appendChild(col_text)

        div.appendChild(row)
    }
}

function saveLocalStorage() {
    var div = document.getElementById("needs").getElementsByTagName("input")
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

function loadScanBox(){
    var x = document.getElementById("divBtnScan");
    x.style.display = "none"
    var x = document.getElementById("divScanBox");
    x.style.display = "block"


}

function activateSave(){
    document.getElementById("saveButton").classList.remove("disabled");
}