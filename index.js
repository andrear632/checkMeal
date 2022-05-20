function loadLocalStorage(){
    var checked = JSON.parse(localStorage.needs)
    var div = document.getElementById("center").getElementsByTagName("input")
    for(var i = 0; i< div.length; i++){
        if(checked.includes(div[i].name)){
            div[i].checked = true
        }
    }
    console.log(checked)
}

function getLocalStorage(){
    var checked = JSON.parse(localStorage.needs)
    var div = document.getElementById("needs")
    for(var i=0; i<checked.length; i++){
        var row = document.createElement('div')
        row.classList.add("row")
        row.classList.add("mx-auto")

        var col_img = document.createElement("div")
        col_img.classList.add("col-4")
        var img = document.createElement("img")
        img.src= "icons/"+ checked[i] + ".png"
        col_img.appendChild(img)

        var col_text = document.createElement('div')
        col_text.classList.add("col-8")
        col_text.classList.add("p-5")
        col_text.classList.add("display-3")
        col_text.innerHTML = checked[i]

        row.appendChild(col_img)
        row.appendChild(col_text)

        div.appendChild(row)
    }
}

function saveLocalStorage() {
    var div = document.getElementById("center").getElementsByTagName("input")
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